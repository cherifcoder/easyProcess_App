const Releve = require("../models/releveModel");

// ✅ Créer un relevé
exports.createReleve = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule,email, semestre, statut } = req.body;

        const newReleve = new Releve({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            email,
            matricule,
            semestre,
            statut
        });

        await newReleve.save();
        res.redirect("/demandes/releve")
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher tous les relevés
exports.getAllReleves = async (req, res) => {
    try {
        const { q, filiere, statut, niveau } = req.query;
          
        let filter = {};
    
        // Recherche texte
        if (q) {
          filter.$or = [
            { nom: new RegExp(q, "i") },
            { prenom: new RegExp(q, "i") },
            { promotion: new RegExp(q, "i") },
            { matricule: new RegExp(q, "i") }
          ];
        }
    
        // Filtre par niveau
        if (niveau) {
          filter.niveau = niveau;
        }
    
        // Filtre par filiere
        if (filiere) {
          filter.filiere = filiere;
        }
    
        // Filtre par statut
        if (statut) {
          filter.statut = statut;
        }

        const releves = await Releve.find(filter);
        releves.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.render("demandes/releve/list", {
            title: "Gestion des demandes - Liste Relevés",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Relevé" },
                { label: "Liste", url: null }
            ],
            releves
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Afficher un relevé par ID
exports.getReleveById = async (req, res) => {
    try {
        const releve = await Releve.findOne({ identifiant: req.params.id });
        if (!releve) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }

        res.render("demandes/releve/view", {
            title: "Gestion des demandes - Afficher Relevé",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Relevé", url: "/demandes/releve" },
                { label: "Afficher", url: null }
            ],
            releve
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Supprimer un relevé
exports.deleteReleve = async (req, res) => {
    try {
        const releve = await Releve.findOneAndDelete({ identifiant: req.params.id });
        if (!releve) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }
        res.redirect("/demandes/releve");
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Formulaire d’édition
exports.getReleveEditForm = async (req, res) => {
    try {
        const releve = await Releve.findOne({ identifiant: req.params.id });
        if (!releve) {
            return res.status(404).send("Demande introuvable");
        }

        res.render("demandes/releve/edit", {
            title: "Gestion des demandes - Modifier Relevé",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Relevé", url: "/demandes/releve" },
                { label: "Modifier", url: null }
            ],
            releve
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};

// ✅ Mettre à jour un relevé
exports.updateReleve = async (req, res) => {
    try {
        const releve = await Releve.findOneAndUpdate(
            { identifiant: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!releve) {
            return res.status(404).send("Demande introuvable");
        }

        res.redirect("/demandes/releve");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
};

exports.validerReleve = async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const releve = await Releve.findOne({ identifiant });

    if (!releve) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    releve.statut = "Validee";
    await releve.save();

    res.redirect("/demandes/releve");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};

exports.rejeterReleve= async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const releve = await Releve.findOne({ identifiant });

    if (!releve) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    releve.statut = "Rejetee";
    await releve.save();

    res.redirect("/demandes/releve");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};



const mailer = require("../services/mailer");
exports.sendReleve = async (req, res) => {
    try {
      const releve = await Releve.findOne({ identifiant: req.params.id });
      if (!releve) {
        return res.status(404).send("Relevé introuvable");
      }
  
      if (!req.file) {
        return res.status(400).send("Aucun fichier reçu");
      }
  
      // Sauvegarde du PDF dans MongoDB
      releve.pdfFile = req.file.buffer;
      releve.statut = "Signee";
      await releve.save();

      await mailer.sendPdf(
        releve.email,
        "Votre relevé de notes " + releve.identifiant,
        `Bonjour ${releve.prenom},\n\nVeuillez trouver ci-joint votre relevé de notes.`,
        releve.pdfFile,
        "Releve.pdf"
      );
  
      res.redirect("/demandes/releve/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors de l’envoi du relevé");
    }
  };
  

  exports.downloadPdf = async (req, res) => {
      try {
        const releve = await Releve.findOne({ identifiant: req.params.identifiant });
    
        if (!releve || !releve.pdfFile) {
          return res.status(404).send("Fichier introuvable");
        }
    
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=${releve.identifiant}.pdf`);
        res.send(releve.pdfFile);
      } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors du téléchargement");
      }
    };
    
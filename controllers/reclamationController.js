const Reclamation = require("../models/reclamationModel");

// ✅ Créer une réclamation
exports.createReclamation = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule, matiere, professeur, motif, email, session, statut } = req.body;

        const newReclamation = new Reclamation({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            matiere,
            professeur,
            email,
            motif,
            session,
            statut
        });

        await newReclamation.save();
        res.redirect("/demandes/reclamation")
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher toutes les réclamations
exports.getAllReclamations = async (req, res) => {
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

        const reclamations = await Reclamation.find(filter);
        reclamations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.render("demandes/reclamation/list", {
            title: "Gestion des demandes - Liste Réclamations",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Réclamation" },
                { label: "Liste", url: null }
            ],
            reclamations
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Afficher une réclamation par ID
exports.getReclamationById = async (req, res) => {
    try {
        const reclamation = await Reclamation.findOne({ identifiant: req.params.id });
        if (!reclamation) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }

        res.render("demandes/reclamation/view", {
            title: "Gestion des demandes - Afficher Réclamation",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Réclamation", url: "/demandes/reclamation" },
                { label: "Afficher", url: null }
            ],
            reclamation
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Supprimer une réclamation
exports.deleteReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findOneAndDelete({ identifiant: req.params.id });
        if (!reclamation) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }
        res.redirect("/demandes/reclamation");
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Formulaire d’édition
exports.getReclamationEditForm = async (req, res) => {
    try {
        const reclamation = await Reclamation.findOne({ identifiant: req.params.id });
        if (!reclamation) {
            return res.status(404).send("Demande introuvable");
        }

        res.render("demandes/reclamation/edit", {
            title: "Gestion des demandes - Modifier Réclamation",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Réclamation", url: "/demandes/reclamation" },
                { label: "Modifier", url: null }
            ],
            reclamation
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};

// ✅ Mettre à jour une réclamation
exports.updateReclamation = async (req, res) => {
    try {
        const reclamation = await Reclamation.findOneAndUpdate(
            { identifiant: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!reclamation) {
            return res.status(404).send("Demande introuvable");
        }

        res.redirect("/demandes/reclamation");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
};



exports.validerReclamation = async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const reclamation = await Reclamation.findOne({ identifiant });

    if (!reclamation) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    reclamation.statut = "Validee";
    await reclamation.save();

    res.redirect("/demandes/reclamation");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};

exports.rejeterReclamation= async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const reclamation = await Reclamation.findOne({ identifiant });

    if (!reclamation) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    reclamation.statut = "Rejetee";
    await reclamation.save();

    res.redirect("/demandes/reclamation");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};

const mailer = require("../services/mailer");

exports.uploadAndSend = async (req, res) => {
    try {
      const reclamation = await Reclamation.findOne({ identifiant: req.params.id });
      if (!reclamation) {
        return res.status(404).send("Réclamation introuvable");
      }
  
      if (!req.file) {
        return res.status(400).send("Aucun fichier reçu");
      }
  
      // Sauvegarde du PDF dans MongoDB
      reclamation.pdfFile = req.file.buffer;
      reclamation.statut = "Corrigee";
      await reclamation.save();
  
      // Envoi par email avec le PDF
      await mailer.sendPdf(
        reclamation.email,
        "Correction de votre demande " + reclamation.identifiant,
        `Bonjour ${reclamation.prenom},\n\nVeuillez trouver ci-joint la correction de votre demande.`,
        reclamation.pdfFile,
        "Correction.pdf"
      );
  
      res.redirect("/demandes/reclamation/");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors de l’upload et l’envoi");
    }
  };
  

exports.downloadPdf = async (req, res) => {
    try {
      const reclamation = await Reclamation.findOne({ identifiant: req.params.identifiant });
  
      if (!reclamation || !reclamation.pdfFile) {
        return res.status(404).send("Fichier introuvable");
      }
  
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${reclamation.identifiant}.pdf`);
      res.send(reclamation.pdfFile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Erreur lors du téléchargement");
    }
  };
  
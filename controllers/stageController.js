const Stage = require("../models/stageModel");

// ✅ Créer un stage
exports.createStage = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule,email, type, entreprise, maitreDeStage, lieuDeStage, encadrant, duree, statut } = req.body;

        const newStage = new Stage({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            email,
            type,
            entreprise,
            maitreDeStage,
            lieuDeStage,
            encadrant,
            duree,
            statut
        });

        await newStage.save();
        res.redirect("/demandes/stage")
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher tous les stages
exports.getAllStages = async (req, res) => {
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

        const stages = await Stage.find(filter);
        stages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.render("demandes/stage/list", {
            title: "Gestion des demandes - Liste Stages",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Stage" },
                { label: "Liste", url: null }
            ],
            stages
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Afficher un stage par ID
exports.getStageById = async (req, res) => {
    try {
        const stage = await Stage.findOne({ identifiant: req.params.id });
        if (!stage) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }

        res.render("demandes/stage/view", {
            title: "Gestion des demandes - Afficher Stage",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Stage", url: "/demandes/stage" },
                { label: "Afficher", url: null }
            ],
            stage
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Supprimer un stage
exports.deleteStage = async (req, res) => {
    try {
        const stage = await Stage.findOneAndDelete({ identifiant: req.params.id });
        if (!stage) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }
        res.redirect("/demandes/stage");
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Formulaire d’édition
exports.getStageEditForm = async (req, res) => {
    try {
        const stage = await Stage.findOne({ identifiant: req.params.id });
        if (!stage) {
            return res.status(404).send("Demande introuvable");
        }

        res.render("demandes/stage/edit", {
            title: "Gestion des demandes - Modifier Stage",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Stage", url: "/demandes/stage" },
                { label: "Modifier", url: null }
            ],
            stage
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};

// ✅ Mettre à jour un stage
exports.updateStage = async (req, res) => {
    try {
        const stage = await Stage.findOneAndUpdate(
            { identifiant: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!stage) {
            return res.status(404).send("Demande introuvable");
        }

        res.redirect("/demandes/stage");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
};


exports.validerStage = async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const stage = await Stage.findOne({ identifiant });

    if (!stage) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    stage.statut = "Validee";
    await stage.save();

    res.redirect("/demandes/stage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};

exports.rejeterStage = async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const stage = await Stage.findOne({ identifiant });

    if (!stage) return res.status(404).send("Demande introuvable");

    // Mise à jour statut
    stage.statut = "Rejetee";
    await stage.save();

    res.redirect("/demandes/stage");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la validation");
  }
};




const { genererEtEnvoyerPDF } = require("./demandeController");

exports.signerStage = async (req, res) => {
  await genererEtEnvoyerPDF(req, res, "Stage", "demandes/stage/pdfTemplate");
};


exports.downloadStage= async (req, res) => {
  try {
    const identifiant = req.params.identifiant;
    const stage = await Stage.findOne({ identifiant });

    if (!stage) {
      return res.status(404).send("Demande introuvable");
    }
    if (!stage.pdfBuffer) {
      return res.status(404).send("PDF introuvable pour cette demande");
    }

    // Définir les headers pour forcer le téléchargement
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Stage-${identifiant}.pdf"`,
    });

    res.send(stage.pdfBuffer); // ✅ utiliser pdfBuffer
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors du téléchargement du Fiche de stage");
  }
};

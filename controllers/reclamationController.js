const Reclamation = require("../models/reclamationModel");

// ✅ Créer une réclamation
exports.createReclamation = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule, matiere, professeur, motif, session, statut } = req.body;

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
            motif,
            session,
            statut
        });

        await newReclamation.save();
        res.send("Réclamation enregistrée avec succès");
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher toutes les réclamations
exports.getAllReclamations = async (req, res) => {
    try {
        const reclamations = await Reclamation.find();
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

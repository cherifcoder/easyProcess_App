const Recommandation = require("../models/recommandationModel");

// ✅ Créer une recommandation
exports.createRecommandation = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule, semestre, type, destinataire, programme, professeur, infoSupplementaire, statut } = req.body;

        const newRecommandation = new Recommandation({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            semestre,
            type,
            destinataire,
            programme,
            professeur,
            infoSupplementaire,
            statut
        });

        await newRecommandation.save();
        res.send("Recommandation enregistrée avec succès");
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher toutes les recommandations
exports.getAllRecommandations = async (req, res) => {
    try {
        const recommandations = await Recommandation.find();
        recommandations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.render("demandes/recommandation/list", {
            title: "Gestion des demandes - Liste Recommandations",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Recommandation" },
                { label: "Liste", url: null }
            ],
            recommandations
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Afficher une recommandation par ID
exports.getRecommandationById = async (req, res) => {
    try {
        const recommandation = await Recommandation.findOne({ identifiant: req.params.id });
        if (!recommandation) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }

        res.render("demandes/recommandation/view", {
            title: "Gestion des demandes - Afficher Recommandation",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Recommandation", url: "/demandes/recommandation" },
                { label: "Afficher", url: null }
            ],
            recommandation
        });
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Supprimer une recommandation
exports.deleteRecommandation = async (req, res) => {
    try {
        const recommandation = await Recommandation.findOneAndDelete({ identifiant: req.params.id });
        if (!recommandation) {
            return res.render("errors/404", {
                title: "Erreur",
                layout: "layouts/main"
            });
        }
        res.redirect("/demandes/recommandation");
    } catch (err) {
        console.error(err);
        res.render("errors/404", {
            title: "Erreur",
            layout: "layouts/main"
        });
    }
};

// ✅ Formulaire d’édition
exports.getRecommandationEditForm = async (req, res) => {
    try {
        const recommandation = await Recommandation.findOne({ identifiant: req.params.id });
        if (!recommandation) {
            return res.status(404).send("Demande introuvable");
        }

        res.render("demandes/recommandation/edit", {
            title: "Gestion des demandes - Modifier Recommandation",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Recommandation", url: "/demandes/recommandation" },
                { label: "Modifier", url: null }
            ],
            recommandation
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};

// ✅ Mettre à jour une recommandation
exports.updateRecommandation = async (req, res) => {
    try {
        const recommandation = await Recommandation.findOneAndUpdate(
            { identifiant: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!recommandation) {
            return res.status(404).send("Demande introuvable");
        }

        res.redirect("/demandes/recommandation");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
};

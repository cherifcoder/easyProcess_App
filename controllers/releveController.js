const Releve = require("../models/releveModel");

// ✅ Créer un relevé
exports.createReleve = async (req, res) => {
    try {
        const { civilite, nom, prenom, filiere, niveau, promotion, matricule, semestre, statut } = req.body;

        const newReleve = new Releve({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            semestre,
            statut
        });

        await newReleve.save();
        res.send("Relevé enregistré avec succès");
    } catch (err) {
        console.error(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`);
    }
};

// ✅ Afficher tous les relevés
exports.getAllReleves = async (req, res) => {
    try {
        const releves = await Releve.find();
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

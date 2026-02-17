const express = require("express");
const router = express.Router();

const recommandationController = require("../controllers/recommandationController");

// ✅ Formulaire de création
router.get("/demandes/create/recommandation", (req, res) => {
    const local = {
        title: "Gestion des demandes - Créer Recommandation",
        layout: "layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Recommandation" },
            { label: "Créer", url: null }
        ]
    };
    res.render("demandes/recommandation/create", local);
});

// ✅ Création
router.post("/demandes/create/recommandation", recommandationController.createRecommandation);

// ✅ Liste des recommandations
router.get("/demandes/recommandation", recommandationController.getAllRecommandations);

// ✅ Affichage d’une recommandation par ID
router.get("/demandes/recommandation/view/:id", recommandationController.getRecommandationById);

// ✅ Suppression
router.post("/demandes/recommandation/delete/:id", recommandationController.deleteRecommandation);

// ✅ Formulaire d’édition
router.get("/demandes/edit/recommandation/:id", recommandationController.getRecommandationEditForm);

// ✅ Mise à jour
router.post("/demandes/edit/recommandation/:id", recommandationController.updateRecommandation);

module.exports = router;

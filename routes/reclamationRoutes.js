const express = require("express");
const router = express.Router();

const reclamationController = require("../controllers/reclamationController");

// ✅ Formulaire de création
router.get("/demandes/create/reclamation", (req, res) => {
    const local = {
        title: "Gestion des demandes - Créer Réclamation",
        layout: "layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Réclamation" },
            { label: "Créer", url: null }
        ]
    };
    res.render("demandes/reclamation/create", local);
});

// ✅ Création
router.post("/demandes/create/reclamation", reclamationController.createReclamation);

// ✅ Liste des réclamations
router.get("/demandes/reclamation", reclamationController.getAllReclamations);

// ✅ Affichage d’une réclamation par ID
router.get("/demandes/reclamation/view/:id", reclamationController.getReclamationById);

// ✅ Suppression
router.post("/demandes/reclamation/delete/:id", reclamationController.deleteReclamation);

// ✅ Formulaire d’édition
router.get("/demandes/edit/reclamation/:id", reclamationController.getReclamationEditForm);

// ✅ Mise à jour
router.post("/demandes/edit/reclamation/:id", reclamationController.updateReclamation);

module.exports = router;

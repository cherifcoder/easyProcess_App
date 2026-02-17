const express = require("express");
const router = express.Router();

const releveController = require("../controllers/releveController");

// ✅ Formulaire de création
router.get("/demandes/create/releve", (req, res) => {
    const local = {
        title: "Gestion des demandes - Créer Relevé",
        layout: "layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Relevé" },
            { label: "Créer", url: null }
        ]
    };
    res.render("demandes/releve/create", local);
});

// ✅ Création
router.post("/demandes/create/releve", releveController.createReleve);

// ✅ Liste des relevés
router.get("/demandes/releve", releveController.getAllReleves);

// ✅ Affichage d’un relevé par ID
router.get("/demandes/releve/view/:id", releveController.getReleveById);

// ✅ Suppression
router.post("/demandes/releve/delete/:id", releveController.deleteReleve);

// ✅ Formulaire d’édition
router.get("/demandes/edit/releve/:id", releveController.getReleveEditForm);

// ✅ Mise à jour
router.post("/demandes/edit/releve/:id", releveController.updateReleve);

module.exports = router;

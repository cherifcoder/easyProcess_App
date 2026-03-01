const express = require("express");
const router = express.Router();

const stageController = require("../controllers/stageController");

// ✅ Formulaire de création
router.get("/demandes/create/stage", (req, res) => {
    const local = {
        title: "Gestion des demandes - Créer Stage",
        layout: "layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Stage" },
            { label: "Créer", url: null }
        ]
    };
    res.render("demandes/stage/create", local);
});

// ✅ Création
router.post("/demandes/create/stage", stageController.createStage);

// ✅ Liste des stages
router.get("/demandes/stage", stageController.getAllStages);

// ✅ Affichage d’un stage par ID
router.get("/demandes/stage/view/:id", stageController.getStageById);

// ✅ Suppression
router.post("/demandes/stage/delete/:id", stageController.deleteStage);

// ✅ Formulaire d’édition
router.get("/demandes/edit/stage/:id", stageController.getStageEditForm);

// ✅ Mise à jour
router.post("/demandes/edit/stage/:id", stageController.updateStage);


router.get("/demandes/stage/valider/:identifiant", stageController.validerStage); 
router.get("/demandes/stage/rejeter/:identifiant", stageController.rejeterStage); 
router.get("/demandes/stage/signer/:identifiant", stageController.signerStage,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Stage'); }); 

router.get("/demandes/stage/download/:identifiant", stageController.downloadStage);

module.exports = router;

module.exports = router;

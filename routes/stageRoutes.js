const express = require("express");
const router = express.Router();

const stageController = require("../controllers/stageController");
const { isAuthenticated, isAdmin, isDirecteur } = require("../middleware/auth");
// Formulaire de création
router.get("/demandes/create/stage" ,isAuthenticated, (req, res) => {
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

// Création
router.post("/demandes/create/stage", stageController.createStage ,isAuthenticated);

// Liste des stages
router.get("/demandes/stage", stageController.getAllStages ,isAuthenticated);

// Affichage d’un stage par ID
router.get("/demandes/stage/view/:id", stageController.getStageById  ,isAuthenticated);

// Suppression
router.post("/demandes/stage/delete/:id", stageController.deleteStage  ,isAuthenticated);

// Formulaire d’édition
router.get("/demandes/edit/stage/:id", stageController.getStageEditForm  ,isAuthenticated);

// Mise à jour
router.post("/demandes/edit/stage/:id", stageController.updateStage  ,isAuthenticated);


router.get("/demandes/stage/valider/:identifiant", stageController.validerStage  ,isAuthenticated,isAdmin); 
router.get("/demandes/stage/rejeter/:identifiant", stageController.rejeterStage  ,isAuthenticated,isAdmin); 
router.get("/demandes/stage/signer/:identifiant", stageController.signerStage, isAuthenticated,isAdmin,isDirecteur,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Stage'); }); 

router.get("/demandes/stage/download/:identifiant", stageController.downloadStage  ,isAuthenticated);



module.exports = router;

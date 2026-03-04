const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin, isDirecteur } = require("../middleware/auth");
const releveController = require("../controllers/releveController");

// Formulaire de création
router.get("/demandes/create/releve",isAuthenticated, (req, res) => {
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

// Création
router.post("/demandes/create/releve", releveController.createReleve ,isAuthenticated);

// Liste des relevés
router.get("/demandes/releve", releveController.getAllReleves ,isAuthenticated);

// Affichage d’un relevé par ID
router.get("/demandes/releve/view/:id", releveController.getReleveById ,isAuthenticated);

// Suppression
router.post("/demandes/releve/delete/:id", releveController.deleteReleve ,isAuthenticated);

// Formulaire d’édition
router.get("/demandes/edit/releve/:id", releveController.getReleveEditForm ,isAuthenticated);

// Mise à jour
router.post("/demandes/edit/releve/:id", releveController.updateReleve ,isAuthenticated);

router.get("/demandes/releve/valider/:identifiant", releveController.validerReleve ,isAuthenticated,isAdmin); 
router.get("/demandes/releve/rejeter/:identifiant", releveController.rejeterReleve ,isAuthenticated,isAdmin); 


const multer = require("multer");


const storage = multer.memoryStorage(); // stocke en mémoire pour sauvegarde en DB
const upload = multer({ storage });

router.post(
  "/demandes/releve/upload/:id",
  upload.single("pdfCorrection"),
  releveController.sendReleve
);

router.get("/demandes/releve/download/:identifiant", releveController.downloadPdf ,isAuthenticated); 

module.exports = router;

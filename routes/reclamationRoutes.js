const express = require("express");
const router = express.Router();

const reclamationController = require("../controllers/reclamationController");
const { isAuthenticated, isAdmin, isEtudiant } = require("../middleware/auth");
// Formulaire de création
router.get("/demandes/create/reclamation",isAuthenticated, (req, res) => {
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

// Création
router.post("/demandes/create/reclamation", reclamationController.createReclamation ,isAuthenticated);

// Liste des réclamations
router.get("/demandes/reclamation", reclamationController.getAllReclamations ,isAuthenticated);

// Affichage d’une réclamation par ID
router.get("/demandes/reclamation/view/:id", reclamationController.getReclamationById ,isAuthenticated);

// Suppression
router.post("/demandes/reclamation/delete/:id", reclamationController.deleteReclamation ,isAuthenticated);

// Formulaire d’édition
router.get("/demandes/edit/reclamation/:id", reclamationController.getReclamationEditForm ,isAuthenticated);

// Mise à jour
router.post("/demandes/edit/reclamation/:id", reclamationController.updateReclamation ,isAuthenticated);

router.get("/demandes/reclamation/valider/:identifiant", reclamationController.validerReclamation ,isAuthenticated,isAdmin); 
router.get("/demandes/reclamation/rejeter/:identifiant", reclamationController.rejeterReclamation ,isAuthenticated,isAdmin); 


// routes/reclamation.js
const multer = require("multer");


const storage = multer.memoryStorage(); // stocke en mémoire pour sauvegarde en DB
const upload = multer({ storage });

router.post(
  "/demandes/reclamation/upload/:id",
  upload.single("pdfCorrection"),
  reclamationController.uploadAndSend
);

router.get("/demandes/reclamation/download/:identifiant", reclamationController.downloadPdf ,isAuthenticated); 

module.exports = router;

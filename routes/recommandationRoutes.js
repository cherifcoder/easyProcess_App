const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin, isDirecteur } = require("../middleware/auth");
const recommandationController = require("../controllers/recommandationController");

// Formulaire de création
router.get("/demandes/create/recommandation",isAuthenticated, (req, res) => {
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

//  Création
router.post("/demandes/create/recommandation", recommandationController.createRecommandation ,isAuthenticated);

//  Liste des recommandations
router.get("/demandes/recommandation", recommandationController.getAllRecommandations ,isAuthenticated);

//  Affichage d’une recommandation par ID
router.get("/demandes/recommandation/view/:id", recommandationController.getRecommandationById ,isAuthenticated);

//  Suppression
router.post("/demandes/recommandation/delete/:id", recommandationController.deleteRecommandation ,isAuthenticated);

// Formulaire d’édition
router.get("/demandes/edit/recommandation/:id", recommandationController.getRecommandationEditForm ,isAuthenticated);

//  Mise à jour
router.post("/demandes/edit/recommandation/:id", recommandationController.updateRecommandation ,isAuthenticated);


router.get("/demandes/recommandation/valider/:identifiant", recommandationController.validerRecommandation ,isAuthenticated,isAdmin); 
router.get("/demandes/recommandation/rejeter/:identifiant", recommandationController.rejeterRecommandation ,isAuthenticated,isAdmin); 
router.get("/demandes/recommandation/signer/:identifiant", recommandationController.signerRecommandation,isAuthenticated,isAdmin,isDirecteur,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Recommandation'); }); 

router.get("/demandes/recommandation/download/:identifiant", recommandationController.downloadRecommandation ,isAuthenticated);

module.exports = router;

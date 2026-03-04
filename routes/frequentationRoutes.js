const express=require("express")
const router=express.Router()

const frequentationController=require("../controllers/frequentationController")
const { isAuthenticated, isAdmin, isDirecteur } = require("../middleware/auth");

router.get("/demandes/create/frequentation",isAuthenticated,(req,res)=>{
        const local={
            title:"Gestion des demandes - creer Frequentation",
            layout:"layouts/main",
             breadcrumbs:[
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Frequentation"},
            { label: "Créer", url: null }
          ]
        }
    res.render("demandes/frequentation/create", local)
})
router.post("/demandes/create/frequentation",frequentationController.createFrequentation ,isAuthenticated)



router.get("/demandes/frequentation",frequentationController.getAllfrequentation ,isAuthenticated,(req,res)=>{
    const local={
        title:"Gestion des demandes -afficher frequentation",
        layout:"layouts/main",
        
    }
    res.render("demandes/diplome/list",local)
})

router.get("/demandes/frequentation/view/:id",frequentationController.getFrequenationById ,isAuthenticated)


router.post("/demandes/frequentation/delete/:id",frequentationController.deleteFrequentation ,isAuthenticated)


// Route pour le formulaire d'édition des fréquentations
router.get("/demandes/edit/frequentation/:id", frequentationController.getFrequentationEditForm ,isAuthenticated);

// Route pour la mise à jour des fréquentations
router.post("/demandes/edit/frequentation/:id", frequentationController.updateFrequentation ,isAuthenticated);

router.get("/demandes/frequentation/valider/:identifiant", frequentationController.validerFrequentation ,isAuthenticated,isAdmin); 
router.get("/demandes/frequentation/rejeter/:identifiant", frequentationController.rejeterFrequentation ,isAuthenticated,isAdmin); 
router.get("/demandes/frequentation/signer/:identifiant", frequentationController.signerFrequentation,isAuthenticated,isAdmin,isDirecteur,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Frequentation'); }); 

router.get("/demandes/frequentation/download/:identifiant", frequentationController.downloadFrequentation ,isAuthenticated);

module.exports=router
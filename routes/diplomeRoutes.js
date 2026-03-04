const express=require("express")
const router=express.Router()
const diplomeController=require("../controllers/diplomeController")
const { isAuthenticated, isAdmin, isDirecteur } = require("../middleware/auth");
router.get("/demandes/create/diplome",isAuthenticated,(req,res)=>{
    const local={
        title:"Gestion des demandes - creer Diplome",
        layout:"layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Diplome"},
            { label: "Créer", url: null }
          ]
    }
    
    res.render("demandes/diplome/create",local)
})
router.post("/demandes/create/diplome",diplomeController.createDiplome ,isAuthenticated)
 

router.get("/demandes/diplome",diplomeController.getAllDiplome ,isAuthenticated,isAdmin)


router.get("/demandes/diplome/view/:id",diplomeController.getDiplomeById ,isAuthenticated)


router.get("/demandes/edit/diplome/:id",diplomeController.getDiplomeEditForm ,isAuthenticated)




router.post("/demandes/edit/diplome/:id", diplomeController.updateDiplome,isAuthenticated);



router.post("/demandes/diplome/delete/:id",diplomeController.deleteDiplome ,isAuthenticated)


router.get("/demandes/diplome/valider/:identifiant", diplomeController.validerDiplome,isAuthenticated,isAdmin); 
router.get("/demandes/diplome/rejeter/:identifiant", diplomeController.rejeterDiplome,isAuthenticated,isAdmin); 
router.get("/demandes/diplome/signer/:identifiant", diplomeController.signerDiplome,isAuthenticated,isAdmin, isDirecteur,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Diplome'); }); 

router.get("/demandes/diplome/download/:identifiant", diplomeController.downloadDiplome ,isAuthenticated);

module.exports=router
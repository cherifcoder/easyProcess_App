const express=require("express")
const router=express.Router()
const diplomeController=require("../controllers/diplomeController")

router.get("/demandes/create/diplome",(req,res)=>{
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
router.post("/demandes/create/diplome",diplomeController.createDiplome)
 

router.get("/demandes/diplome",diplomeController.getAllDiplome)


router.get("/demandes/diplome/view/:id",diplomeController.getDiplomeById)


router.get("/demandes/edit/diplome/:id",diplomeController.getDiplomeEditForm)




router.post("/demandes/edit/diplome/:id", diplomeController.updateDiplome);



router.post("/demandes/diplome/delete/:id",diplomeController.deleteDiplome)


router.get("/demandes/diplome/valider/:identifiant", diplomeController.validerDiplome); 
router.get("/demandes/diplome/rejeter/:identifiant", diplomeController.rejeterDiplome); 
router.get("/demandes/diplome/signer/:identifiant", diplomeController.signerDiplome,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Diplome'); }); 

router.get("/demandes/diplome/download/:identifiant", diplomeController.downloadDiplome);

module.exports=router
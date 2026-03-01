const express=require("express")
const router=express.Router()

const frequentationController=require("../controllers/frequentationController")


router.get("/demandes/create/frequentation",(req,res)=>{
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
router.post("/demandes/create/frequentation",frequentationController.createFrequentation)



router.get("/demandes/frequentation",frequentationController.getAllfrequentation,(req,res)=>{
    const local={
        title:"Gestion des demandes -afficher frequentation",
        layout:"layouts/main",
        
    }
    res.render("demandes/diplome/list",local)
})

router.get("/demandes/frequentation/view/:id",frequentationController.getFrequenationById)


router.post("/demandes/frequentation/delete/:id",frequentationController.deleteFrequentation)


// Route pour le formulaire d'édition des fréquentations
router.get("/demandes/edit/frequentation/:id", frequentationController.getFrequentationEditForm);

// Route pour la mise à jour des fréquentations
router.post("/demandes/edit/frequentation/:id", frequentationController.updateFrequentation);

router.get("/demandes/frequentation/valider/:identifiant", frequentationController.validerFrequentation); 
router.get("/demandes/frequentation/rejeter/:identifiant", frequentationController.rejeterFrequentation); 
router.get("/demandes/frequentation/signer/:identifiant", frequentationController.signerFrequentation,
    (req, res) => { demandeController.genererEtEnvoyerPDF(req, res, 'Frequentation'); }); 

router.get("/demandes/frequentation/download/:identifiant", frequentationController.downloadFrequentation);

module.exports=router
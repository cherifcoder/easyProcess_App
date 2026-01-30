const express=require("express")
const router=express.Router()

const frequentationController=require("../controllers/frequentationController")


router.get("/demandes/create/frequentation",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creation attestation",
        layout:"layouts/main",
       
            breadcrumbs: [
              { label: "Demandes", url: "/demandes" },
              { label: "Type de demande", url: "/demandes/type" },
              { label: "Diplôme", url: "/demandes/type/diplome" },
              { label: "Créer", url: null }
            ]

        
    }
    res.render("demandes/frequentation/create",local)
})
router.post("/demandes/create/frequentation",frequentationController.createFrequentation)



router.get("/demandes/frequentation",frequentationController.getAllfrequentation,(req,res)=>{
    const local={
        title:"Gestion des demandes -afficher frequentation",
        layout:"layouts/main"
    }
    res.render("demandes/diplome/list")
})

router.get("/demandes/frequentation/view/:id",frequentationController.getFrequenationById)


router.post("/demandes/frequentation/delete/:id",frequentationController.deleteFrequentation)

module.exports=router
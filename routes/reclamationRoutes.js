const express=require("express")
const router=express.Router()

const reclamationController=require("../controllers/reclamationController")

router.get("/demandes/create/reclamation",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creer reclamation",
        layout:"layouts/main",
        breadcrumbs:[
       { label: "Demandes", url: "#" },
       { label: "Type de demande", url: "/demandes" },
       { label: "Reclamation"},
       { label: "Créer", url: null }
     ]
    }
    res.render("demandes/reclamation/create",local)
})
router.post("/demandes/create/reclamation",reclamationController.createReclamation)


module.exports=router
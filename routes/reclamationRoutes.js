const express=require("express")
const router=express.Router()

const reclamationController=require("../controllers/reclamationController")

router.get("/demandes/create/reclamation",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creation reclamation",
        layout:"layouts/main"
    }
    res.render("demandes/reclamation/create",local)
})
router.post("/demandes/create/reclamation",reclamationController.createReclamation)


module.exports=router
const express=require("express")
const router=express.Router()
const stageController=require("../controllers/stageController")


router.get("/demandes/create/stage",(req,res)=>{
    const local={
        title:"Gestion des demandes - Fiche de stage",
        layout:"layouts/main",
        breadcrumbs:[
       { label: "Demandes", url: "#" },
       { label: "Type de demande", url: "/demandes" },
       { label: "Releve"},
       { label: "Créer", url: null }
     ] 
    }
    res.render("demandes/stage/create",local)
})
router.post("/demandes/create/stage",stageController.createStage)


module.exports=router
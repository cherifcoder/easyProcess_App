const express=require("express")
const router=express.Router()

const recommandationController=require("../controllers/recommandationController")


router.get("/demandes/create/recommandation",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creation recommandation",
        layout:"layouts/main",
        breadcrumbs:[
       { label: "Demandes", url: "#" },
       { label: "Type de demande", url: "/demandes" },
       { label: "Recommandation"},
       { label: "Créer", url: null }
     ]
    }
    res.render("demandes/recommandation/create",local)
})
router.post("/demandes/create/recommandation", recommandationController.createRecommandation)


module.exports=router
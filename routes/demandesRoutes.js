const express=require("express")
const router=express.Router()

router.get("/demandes",(req,res)=>{
    const local={
        title:"Gestion des demandes - Choix de demande",
        layout:"layouts/main"
    }
    res.render("demandes/demandes",local)
})


module.exports=router
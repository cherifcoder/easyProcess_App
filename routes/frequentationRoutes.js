const express=require("express")
const router=express.Router()

const frequentationController=require("../controllers/frequentationController")


router.get("/demandes/create/frequentation",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creation attestation",
        layout:"layouts/main"
    }
    res.render("demandes/frequentation",local)
})
router.post("/demandes/create/frequentation",frequentationController.createFrequentation)


module.exports=router
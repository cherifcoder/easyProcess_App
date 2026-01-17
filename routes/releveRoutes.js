const express=require("express")
const router=express.Router()


const releveController=require("../controllers/releveController")


router.get("/demandes/create/releve",(req,res)=>{
    const local={
        title:"Gestion des demandes - Creation releve de note",
        layout:"layouts/main"
    }
    res.render("demandes/releve",local)
})
router.post("/demandes/create/releve", releveController.createReleve)


module.exports=router
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

module.exports=router
const express=require("express")
const router=express.Router()
const diplomeController=require("../controllers/diplomeController")

router.get("/demandes/create/diplome",(req,res)=>{
    const local={
        title:"Gestion des demandes - creer Diplome",
        layout:"layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Diplome"},
            { label: "Créer", url: null }
          ]
    }
    
    res.render("demandes/diplome/create",local)
})
router.post("/demandes/create/diplome",diplomeController.createDiplome)
 

router.get("/demandes/diplome",diplomeController.getAllDiplome,(req,res)=>{
    const local={
        title:" Gestion des demandes - Afficher Diplome",
        layout:"layouts/main",
       
    }
    res.render("demandes/diplome/list", local)
})


router.get("/demandes/diplome/view/:id",diplomeController.getDiplomeById,(req,res)=>{
    const local={
        title:"Gestion des demandes - Afficher Diplome",
        layout:"layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Frequentation"},
            { label: "Créer", url: null }
          ]
    }
})


router.get("/demandes/edit/diplome/:id",diplomeController.getDiplomeEditForm,(req,res)=>{
    const local={
        title:"Gestion des demandes- Modifier diplome",
        layout:"layouts/main",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" },
            { label: "Frequentation"},
            { label: "Créer", url: null }
          ]
    }
})

router.post("/demandes/edit/diplome/:id",diplomeController.updateDiplome,(req,res)=>{
    const local={
        title:"Gestion des demandes- Modifier diplome",
        layout:"layouts/main"
    }
})


router.post("/demandes/diplome/delete/:id",diplomeController.deleteDiplome)
module.exports=router
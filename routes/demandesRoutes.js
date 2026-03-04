const express=require("express")
const router=express.Router()
const demandeController = require('../controllers/demandeController');
const { isAuthenticated, isAdmin, isEtudiant } = require("../middleware/auth");
router.get("/demandes",isAuthenticated,(req,res)=>{
    const local={
        title:"Gestion des demandes - Choix de demande",
        layout:"layouts/main",
        titre_nav:"Demandes > choix des demande",
        breadcrumbs: [
            { label: "Demandes", url: "#" },
            { label: "Type de demande", url: "/demandes" }
          ]
    }
    res.render("demandes/demandes",local)
}) 

router.get("/demandes/list", demandeController.getAllDemandes ,isAuthenticated,isAdmin);

router.get("/mesDemandes/list", isAuthenticated, demandeController.getMyDemandes,isAuthenticated);

module.exports=router
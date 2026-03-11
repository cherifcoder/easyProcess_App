const express=require('express')
const router=express.Router()
const etudiantController=require("../controllers/etudiantController")
const demandeController=require("../controllers/demandeController")
const { isAuthenticated, isAdmin, isEtudiant } = require("../middleware/auth");
router.get("/", (req,res)=>{
    const local={
        title:"Connexion"
    }

    res.render('./auth/login',local)
})

router.get("/register",
    (req,res)=>{
        const local={
            title:"Inscription"
        }
        res.render('./auth/register', local)
    }
    
)
router.post("/register", etudiantController.registerEtudiant)


router.get("/users/etd",etudiantController.getAllEtudiant ,isAuthenticated,isAdmin)

router.get("/users/etd/view/:id", etudiantController.getEtudiantById ,isAuthenticated,isAdmin);




router.get("/users/etd/edit/:id", etudiantController.getEtudiantEditForm ,isAuthenticated,isAdmin);
// Exemple : /users/etd/edit/ETD-001-GI-25
router.post("/users/etd/edit/:id", etudiantController.updateEtudiant ,isAuthenticated,isAdmin);


router.post("/users/etd/delete/:id", etudiantController.deleteEtudiant ,isAuthenticated,isAdmin);



module.exports=router
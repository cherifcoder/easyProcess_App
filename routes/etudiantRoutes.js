const express=require('express')
const router=express.Router()
const etudiantController=require("../controllers/etudiantController")
const demandeController=require("../controllers/demandeController")

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


router.get("/users/etd",etudiantController.getAllEtudiant)

router.get("/users/etd/view/:id", etudiantController.getEtudiantById);




router.get("/users/etd/edit/:id", etudiantController.getEtudiantEditForm);
// Exemple : /users/etd/edit/ETD-001-GI-25
router.post("/users/etd/edit/:id", etudiantController.updateEtudiant);


router.post("/users/etd/delete/:id", etudiantController.deleteEtudiant);



module.exports=router
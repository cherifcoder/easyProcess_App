const express=require('express')
const router=express.Router()
const etudiantController=require("../controllers/etudiantController")

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
router.get("/login", (req,res)=>{
    const local={
        title:"Connexion" 
    }
    res.render('./auth/login', local)
})
router.post("/login", etudiantController.loginEtudiant)

router.get("/dashboard",(req,res)=>{
    const local={
        title:"Dashboard",
        layout:"./layouts/main"
    }
    res.render("pages/dashboard", local)
})

router.get("/users/etd",etudiantController.getAllEtudiant,(req,res)=>{
    const local={
        title:" Gestion des utilisateurs - Afficher Etudiant",
        layout:"layouts/main",
       
    }
    res.render("users/etd/list", local)
})


router.get("/users/etd/view/:id", etudiantController.getEtudiantById,
    (req,res)=>{
        const local={
            title:"Gestion des Utilisateurs - Afficher etudiant",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Etudiant", url: "/etd" },
                { label: "Afficher"},
              ]
        }
    }

);




router.get("/users/etd/edit/:id", etudiantController.getEtudiantEditForm);
// Exemple : /users/etd/edit/ETD-001-GI-25
router.post("/users/etd/edit/:id", etudiantController.updateEtudiant);


router.post("/users/etd/delete/:id", etudiantController.deleteEtudiant);



module.exports=router
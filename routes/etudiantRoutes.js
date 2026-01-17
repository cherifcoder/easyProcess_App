const express=require('express')
const router=express.Router()
const etudiantController=require("../controllers/etudiantController")

router.get("/", (req,res)=>{
    const local={
        title:"Inscription"
    }

    res.render('./auth/register',local)
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

module.exports=router
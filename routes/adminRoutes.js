const express=require('express')
const router=express.Router()
const adminController=require("../controllers/adminController")
const { isAuthenticated, isAdmin, isEtudiant } = require("../middleware/auth");
router.get("/users/create/admin", isAuthenticated,isAdmin,
    (req,res)=>{
        const local={
            title:"Gestion des Utilisateur - creer Admin",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Admin", url: "/etd" },
                { label: "Creer"},
              ]
        }
        res.render('users/admin/create', local)
    }
    
)
router.post("/users/create/admin", adminController.createAdmin,isAuthenticated,isAdmin)

router.get("/users/admin",adminController.getAllAdmin,isAuthenticated,isAdmin,(req,res)=>{
    const local={
        title:" Gestion des utilisateurs - Afficher Utilisateur",
        layout:"layouts/main",
       
    }
    res.render("users/admin/list", local)
})


const demandeController = require("../controllers/demandeController");

router.get("/dashboard", demandeController.getDashboardStats,isAuthenticated,isAdmin);


router.get("/users/admin/view/:id", adminController.getAdminById,isAuthenticated,isAdmin,
    (req,res)=>{
        const local ={
            title:"Gestion des Utilisateurs - Afficher utilisateur",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Admin", url: "/etd" },
                { label: "Afficher"},
              ]
        }
    }

);




router.get("/users/admin/edit/:id", adminController.getAdminEditForm, isAuthenticated,isAdmin);
// Exemple : /users/etd/edit/ETD-001-GI-25
router.post("/users/admin/edit/:id", adminController.updateAdmin,isAuthenticated,isAdmin);


router.post("/users/admin/delete/:id", adminController.deleteAdmin,isAuthenticated,isAdmin);

router.get("/users/create",isAuthenticated,isAdmin, (req,res)=>{
    const local ={
        title:"Gestion des Utilisateurs - Afficher utilisateur",
        layout:"layouts/main",
        breadcrumbs: [
            { label: "Utilisateurs", url: "#" },
            { label: "Choix"},
          ]
    }
    res.render("users/users",local)
})

module.exports=router
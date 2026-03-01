const express=require('express')
const router=express.Router()
const adminController=require("../controllers/adminController")

router.get("/users/create/admin",
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
router.post("/users/create/admin", adminController.createAdmin)

router.get("/users/admin",adminController.getAllAdmin,(req,res)=>{
    const local={
        title:" Gestion des utilisateurs - Afficher Utilisateur",
        layout:"layouts/main",
       
    }
    res.render("users/admin/list", local)
})


const demandeController = require("../controllers/demandeController");

router.get("/dashboard", demandeController.getDashboardStats);


router.get("/users/admin/view/:id", adminController.getAdminById,
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




router.get("/users/admin/edit/:id", adminController.getAdminEditForm);
// Exemple : /users/etd/edit/ETD-001-GI-25
router.post("/users/admin/edit/:id", adminController.updateAdmin);


router.post("/users/admin/delete/:id", adminController.deleteAdmin);

router.get("/users/create", (req,res)=>{
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
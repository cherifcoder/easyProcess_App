const bcrypt=require('bcrypt')
const Admin=require("../models/adminModel")

exports.createAdmin=async(req,res)=>{
    try{
        const {nom, prenom, dateNaissance, sexe, adresse, telephone,poste,email, motDePass}=req.body;
        const hasedpassword=await bcrypt.hash(motDePass,10)
        
        const newAdmin=new Admin({
            nom,
            prenom, 
            dateNaissance, 
            sexe, 
            adresse, 
            telephone, 
            poste,
            email,
            motDePass:hasedpassword
        });


        await newAdmin.save();
        res.send('Utilisateur enregistre avec succes')
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement : ${err}`)
        
    }
};


exports.loginAdmin =async(req,res)=>{
    try{
        const {email, motDePass}=req.body;
        const admin=await Admin.findOne({ email });
        if(!admin) return res.send("Utilisateur non trouve")
        const isMatch=await bcrypt.compare(motDePass, admin.motDePass)
        if(!isMatch) return res.send("Mot de pass incorect")
        
            res.redirect("/dashboard")
    }catch(err){
        res.send(`Erreur lorsde la connexion : ${err}`)
    }
}

exports.getAllAdmin=async(req,res)=>{
    try{
        const admins=await Admin.find().sort({createdAt:-1})
        admins.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt))
        res.render("users/admin/list",
            {
                title: "Gestion des utilisateurs - Afficher Utilisateurs",
                layout: "layouts/main",
                breadcrumbs: [
                    { label: "Utilisateurs", url: "#" },
                    { label: "Admin", url: "/etd" },
                    { label: "Liste", url:null},
                  ],
                admins
            }
        )
    }catch(err){
        console.error(err);
        res.send("Erreur lors de la récupération des utilisateur");
    }
}



exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findOne({ identifiant: req.params.id }); // ✅ identifiant personnalisé

        if (!admin) {
            return res.status(404).send("Utilisateur introuvable");
        
        }res.render("users/admin/view", {
            title: "Gestion des utilisateurs - Afficher Admin",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Admin", url: "/admin" },
                { label: "Afficher", url: null },
            ],
            admin
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};



exports.getAdminEditForm=async(req,res)=>{
    try{
        const admin=await Admin.findOne({identifiant:req.params.id})
        if(!admin){
            return res.status(404).send("Utilisateur introuvable")
        }
        res.render("users/admin/edit",{
            title: "Gestion des utilisateurs - Afficher Utilisateurs",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Admin", url: "/etd" },
                { label: "Modifier", url:null},
              ],
            admin 
        })

    }catch (err) 
    { console.error(err)
     res.status(500).send("Erreur serveur"); }
}


exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOneAndUpdate(
      { identifiant: req.params.id },   // recherche par identifiant
      req.body,                         // données envoyées depuis le formulaire
      { new: true, runValidators: true } // retourne le document mis à jour et applique les validations du schéma
    );

    if (!admin) {
      return res.status(404).send("Utilisateur introuvable");
    }

    // Après modification, on redirige vers la liste ou la vue détaillée
    res.redirect("/users/admin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la modification des information de l'utilisateur  ");
  }
};

exports.deleteAdmin=async(req,res)=>{
    try{
        const admin=await Admin.findOneAndDelete({identifiant:req.params.id})
        if(!admin){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/users/admin")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
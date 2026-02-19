const bcrypt=require('bcrypt')
const Etudiant=require("../models/etudiantModel")

exports.registerEtudiant=async(req,res)=>{
    try{
        const {nom, prenom, dateNaissance, sexe, adresse, telephone, filiere, niveau,promotion, matricule,email, motDePass}=req.body;
        const hasedpassword=await bcrypt.hash(motDePass,10)
        
        const newEtudiant=new Etudiant({
            nom,
            prenom, 
            dateNaissance, 
            sexe, 
            adresse, 
            telephone, 
            filiere, 
            niveau, 
            promotion,
            matricule,
            email,
            motDePass:hasedpassword
        });


        await newEtudiant.save();
        res.send('Etudiant enregistre avec succes')
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement : ${err}`)
        
    }
};

exports.loginEtudiant =async(req,res)=>{
    try{
        const {email, motDePass}=req.body;
        const etudiant=await Etudiant.findOne({ email });
        if(!etudiant) return res.send("Etudiant non trouve")
        const isMatch=await bcrypt.compare(motDePass, etudiant.motDePass)
        if(!isMatch) return res.send("Mot de pass incorect")
        
            res.redirect("/dashboard")
    }catch(err){
        res.send(`Erreur lorsde la connexion : ${err}`)
    }
}

// exports.getAllEtudiant=async(req,res)=>{
//     try{
//         const etudiants=await Etudiant.find().sort({createdAt:-1})
//         etudiants.sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt))
//         res.render("users/etd/list",
//             {
//                 title: "Gestion des utilisateurs - Afficher Utilisateurs",
//                 layout: "layouts/main",
//                 breadcrumbs: [
//                     { label: "Utilisateurs", url: "#" },
//                     { label: "Etudiant", url: "/etd" },
//                     { label: "Liste", url:null},
//                   ],
//                 etudiants
//             }
//         )
//     }catch(err){
//         console.error(err);
//         res.send("Erreur lors de la récupération des etudiants");
//     }
// }

exports.getAllEtudiant = async (req, res) => {
    try {
      const { q, filiere, promotion, niveau } = req.query;
  
      let filter = {};
  
      // Recherche texte
      if (q) {
        filter.$or = [
          { nom: new RegExp(q, "i") },
          { prenom: new RegExp(q, "i") },
          { email: new RegExp(q, "i") },
          { matricule: new RegExp(q, "i") }
        ];
      }
  
      // Filtre par filière
      if (filiere) {
        filter.filiere = filiere;
      }
  
      // Filtre par promotion
      if (promotion) {
        filter.promotion = promotion;
      }
  
      // Filtre par niveau
      if (niveau) {
        filter.niveau = niveau;
      }
  
      const etudiants = await Etudiant.find(filter).sort({ createdAt: -1 });
  
      res.render("users/etd/list", {
        title: "Gestion des utilisateurs - Afficher Utilisateurs",
        layout: "layouts/main",
        breadcrumbs: [
          { label: "Utilisateurs", url: "#" },
          { label: "Etudiant", url: "/etd" },
          { label: "Liste", url: null },
        ],
        etudiants
      });
    } catch (err) {
      console.error(err);
      res.send("Erreur lors de la récupération des étudiants");
    }
  };
  


exports.getEtudiantById = async (req, res) => {
    try {
        const etudiant = await Etudiant.findOne({ identifiant: req.params.id }); // ✅ identifiant personnalisé

        if (!etudiant) {
            return res.status(404).send("Etudiant introuvable");
        
        }res.render("users/etd/view", {
            title: "Gestion des utilisateurs - Afficher Etudiant",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Etudiant", url: "/etd" },
                { label: "Afficher", url: null },
            ],
            etudiant
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
};



exports.getEtudiantEditForm=async(req,res)=>{
    try{
        const etudiant=await Etudiant.findOne({identifiant:req.params.id})
        if(!etudiant){
            return res.status(404).send("Etudiant introuvable")
        }
        res.render("users/etd/edit",{
            title: "Gestion des utilisateurs - Afficher Utilisateurs",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Utilisateurs", url: "#" },
                { label: "Etudiant", url: "/etd" },
                { label: "Modifier", url:null},
              ],
            etudiant 
        })

    }catch (err) 
    { console.error(err)
     res.status(500).send("Erreur serveur"); }
}


exports.updateEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findOneAndUpdate(
      { identifiant: req.params.id },   // recherche par identifiant
      req.body,                         // données envoyées depuis le formulaire
      { new: true, runValidators: true } // retourne le document mis à jour et applique les validations du schéma
    );

    if (!etudiant) {
      return res.status(404).send("Etudiant introuvable");
    }

    // Après modification, on redirige vers la liste ou la vue détaillée
    res.redirect("/users/etd");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la modification des information de l'etudiant");
  }
};

exports.deleteEtudiant=async(req,res)=>{
    try{
        const etudiant=await Etudiant.findOneAndDelete({identifiant:req.params.id})
        if(!etudiant){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/users/etd")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
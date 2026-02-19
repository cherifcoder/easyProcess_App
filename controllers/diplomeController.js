const Diplome=require("../models/diplomeModel")

exports.createDiplome=async(req,res)=>{
    try{
        const{civilite,nom,prenom,filiere,niveau,promotion,matricule,diplome,statut}=req.body
        const newDiplome=new Diplome({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            diplome,
            statut
        })
        await newDiplome.save()
        res.send("Diplome enregistre avec succes ")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
        
    }
}


exports.getAllDiplome=async(req,res)=>{
    try {

         const { q, filiere, statut, niveau } = req.query;
          
              let filter = {};
          
              // Recherche texte
              if (q) {
                filter.$or = [
                  { nom: new RegExp(q, "i") },
                  { prenom: new RegExp(q, "i") },
                  { promotion: new RegExp(q, "i") },
                  { matricule: new RegExp(q, "i") }
                ];
              }
          
              // Filtre par niveau
              if (niveau) {
                filter.niveau = niveau;
              }
          
              // Filtre par filiere
              if (filiere) {
                filter.filiere = filiere;
              }
          
              // Filtre par statut
              if (statut) {
                filter.statut = statut;
              }




        const diplomes = await Diplome.find(filter).sort({createdAt:-1});
        diplomes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.render("demandes/diplome/list", {
            title: "Gestion des demandes - Afficher Diplome",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Diplome", url:null},
                { label: "Liste", url: null }
              ],
            diplomes 
        });
    } catch (err) {
        console.error(err);
        res.send("Erreur lors de la récupération des diplômes");
    }

}

exports.getDiplomeById=async(req,res)=>{
    try{
        const diplome=await Diplome.findOne({identifiant:req.params.id})
        if(!diplome){
            return res.status(404).send("Demande introuvable");
        }
        res.render("demandes/diplome/view",{
            title: "Gestion des demandes - Afficher Diplome",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Diplome",url:"/demandes/diplome"},
                { label: "Afficher",url:null}
              ],
            diplome
        })
    }catch (err) 
    { console.error(err)
     res.status(500).send("Erreur serveur"); }
}


exports.getDiplomeEditForm=async(req,res)=>{
    const diplome=await Diplome.findOne({identifiant:req.params.id})
    res.render("demandes/diplome/edit",{
        title: "Gestion des demandes - Modifier Diplome",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Diplome"},
                { label: "Modifier", url: null }
              ],
            diplome 
    })
}



exports.updateDiplome = async (req, res) => {
  try {
    const diplome = await Diplome.findOneAndUpdate(
      { identifiant: req.params.id },   // recherche par identifiant
      req.body,                         // données envoyées depuis le formulaire
      { new: true, runValidators: true } // retourne le document mis à jour et applique les validations du schéma
    );

    if (!diplome) {
      return res.status(404).send("Demande introuvable");
    }

    // Après modification, on redirige vers la liste ou la vue détaillée
    res.redirect("/demandes/diplome");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur lors de la modification du diplôme");
  }
};


exports.deleteDiplome=async(req,res)=>{
    try{
        const diplome=await Diplome.findOneAndDelete({identifiant:req.params.id})
        if(!diplome){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/diplome")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
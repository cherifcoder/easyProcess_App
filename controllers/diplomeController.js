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
        const diplomes = await Diplome.find();
        diplomes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.render("demandes/diplome/list", {
            title: "Gestion des demandes - Afficher Diplome",
            layout: "layouts/main",
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
            diplome 
        })
    }catch (err) 
    { console.error(err)
     res.status(500).send("Erreur serveur"); }
}


exports.getDiplomeEditForm=async(req,res)=>{
    const diplome=await Diplome.findOne({identifiant:req.params.id},{new:true})
    res.render("demandes/diplome/edit",{
        title: "Gestion des demandes - Modifier Diplome",
            layout: "layouts/main",
            diplome 
    })
}



exports.updateDiplome=async(req,res)=>{
    try{
        const diplome=await Diplome.findOneAndUpdate({identifiant:req.params.id}, req.body)
    }catch(err){
        console.log(err)
        res.status(500).send("Erreur lors de la modification")
    }
}


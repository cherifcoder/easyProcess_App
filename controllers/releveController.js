const Releve=require("../models/releveModel")

exports.createReleve=async(req,res)=>{
    try{
        const {civilite,nom,prenom,filiere, niveau, promotion,matricule,semestre,statut}=req.body
   
        const newReleve=new Releve({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            semestre,
            statut
        })
   
        await newReleve.save();
        res.send("Releve enregistre avec succes")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}

exports.getReleveById= async(req,res)=>{
    try{
        const releve=await Releve.findOne({identifiant:req.params.id})
        if(!releve){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })

        }res.render("demandes/releve/view",{
            title:"Gestion des demandes - Afficher Releve",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Releve",url:"/demandes/releve"},
                { label: "ID:", url: null }
              ],
              releve
        })
    }catch(err){
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
    }
}


exports.deleteReleve=async(req,res)=>{
    try{
        const deleted=await Releve.findOneAndDelete({identifiant:req.params.id})
        if(!deleted){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/releve")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
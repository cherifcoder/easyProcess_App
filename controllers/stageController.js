const Stage=require("../models/stageModel")

exports.createStage=async(req,res)=>{
    try{
        const {civilite,nom,prenom,filiere, niveau, promotion,matricule, type, entreprise,maitreDeStage,lieuDeStage,encadrant,duree,statut}=req.body
   
        const newStage=new Releve({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            type,
            entreprise,
            maitreDeStage,
            lieuDeStage,
            encadrant,
            duree,
            statut
        })
   
        await newStage.save();
        res.send("Stage enregistre avec succes")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}

exports.getStageById= async(req,res)=>{
    try{
        const releve=await Stage.findOne({identifiant:req.params.id})
        if(!releve){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })

        }res.render("demandes/stage/view",{
            title:"Gestion des demandes - Afficher Stage",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Stage",url:"/demandes/stage"},
                { label: "ID:", url: null }
              ],
              stage
        })
    }catch(err){
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
    }
}


exports.deleteStage=async(req,res)=>{
    try{
        const stage=await Releve.findOneAndDelete({identifiant:req.params.id})
        if(!stage){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/stage")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
const Releve=require("../models/stageModel")

exports.createStage=async(req,res)=>{
    try{
        const {civilite,nom,prenom,filiere, niveau, promotion,matricule, type, entreprise,maitreDeStage,lieuDeStage,encadrant,duree}=req.body
   
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
            duree
        })
   
        await newStage.save();
        res.send("Stage enregistre avec succes")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}
const Releve=require("../models/releveModel")

exports.createReleve=async(req,res)=>{
    try{
        const {civilite,nom,prenom,filiere, niveau, promotion,matricule,semestre}=req.body
   
        const newReleve=new Releve({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            semestre
        })
   
        await newReleve.save();
        res.send("Releve enregistre avec succes")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}
const Recommandation=require("../models/recommandationModel")

exports.createRecommandation=async(req,res)=>{
try{
    const{civilite,nom,prenom,filiere, niveau, promotion,matricule,semestre}=req.body
    const newRecommandation=new Recommandation({
        civilite,
        nom,
        prenom,
        filiere,
        niveau,
        promotion,
        matricule,
        semestre,
        type,
        destinataire,
        programme,
        professeur,
        note
    })
    await newRecommandation.save()
    res.send("Recommandation enregistre avec succes")

}catch(err){
    console.log(err);
    res.send(`Erreur lors de l'enregistrement: ${err}`)
    
}

    
}
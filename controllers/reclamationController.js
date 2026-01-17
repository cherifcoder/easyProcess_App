const Reclamation=require("../models/reclamationModel")

exports.createReclamation= async(req,res)=>{
 
    try{
   
const{civilite,nom,prenom,filiere, niveau, promotion,matricule,matiere,professeur,motif,session}=req.body
   const newReclamation=new Reclamation({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            matiere,
            professeur,
            session,
            motif
})
await newReclamation.save()
res.send("Reclamation enregistree avec succes")
    }catch(err){

        console.log(err);
        res.send(`erreur lors de l'enregistrement: ${err}`)
        
    }
}

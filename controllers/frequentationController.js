const Frequentation=require("../models/frequentationModel")

exports.createFrequentation=async(req,res)=>{
    try{

        const{civilite,nom, prenom,filiere,niveau,promotion,matricule,periode,destination}=req.body
        const newFrequentaion=new Frequentation({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            periode,
            destination
        })

        await newFrequentaion.save()
        res.send("Frequentation enregistre avec succes")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}
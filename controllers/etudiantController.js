const bcrypt=require('bcrypt')
const Etudiant=require("../models/etudiantModel")

exports.registerEtudiant=async(req,res)=>{
    try{
        const {nom, prenom, dateNaissance, sexe, adresse, telehone, filiere, niveau,promotion, matricule,email, motDePass}=req.body;
        const hasedpassword=await bcrypt.hash(motDePass,10)
        
        const newEtudiant=new Etudiant({
            nom,
            prenom, 
            dateNaissance, 
            sexe, 
            adresse, 
            telehone, 
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

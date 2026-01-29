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

exports.getAllfrequentation=async(req,res)=>{
    try{
        const frequentations= await Frequentation.find();
        frequentations.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
        res.render("demandes/frequentation/list",{
            title:"Gestion des demandes - Afficher Diplome",
            layout:"layouts/main",
            frequentations
        })
    }catch(err){
        console.log(err);
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main",
        })
    }
}

exports.getFrequenationById= async(req,res)=>{
    try{
        const frequentation=await Frequentation.findOne({identifiant:req.params.id})
        if(!frequentation){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })

        }res.render("demandes/frequentation/view",{
            title:"Gestion des demandes - Afficher Frequentation",
            layout:"layouts/main",
            frequentation
        })
    }catch(err){
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
    }
}


exports.deleteFrequentation=async(req,res)=>{
    try{
        const deleted=await Frequentation.findOneAndDelete({identifiant:req.params.id})
        if(!deleted){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/frequentation")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
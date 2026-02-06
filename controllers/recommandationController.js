const Recommandation=require("../models/recommandationModel")

exports.createRecommandation=async(req,res)=>{
try{
    const{civilite,nom,prenom,filiere, niveau, promotion,matricule,semestre,statut}=req.body
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
        note,
        statut
    })
    await newRecommandation.save()
    res.send("Recommandation enregistre avec succes")

}catch(err){
    console.log(err);
    res.send(`Erreur lors de l'enregistrement: ${err}`)
    
}

}


exports.getRecommandationById= async(req,res)=>{
    try{
        const recommandation=await Recommandation.findOne({identifiant:req.params.id})
        if(!recommandation){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })

        }res.render("demandes/recommandation/view",{
            title:"Gestion des demandes - Afficher Recommandation",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Recommandation",url:"/demandes/recommandation"},
                { label: "ID:", url: null }
              ],
              recommandation
        })
    }catch(err){
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
    }
}


exports.deleteRecommandation=async(req,res)=>{
    try{
        const deleted=await Recommandation.findOneAndDelete({identifiant:req.params.id})
        if(!deleted){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/recommandation")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
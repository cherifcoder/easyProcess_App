const Reclamation=require("../models/reclamationModel")

exports.createReclamation= async(req,res)=>{
 
    try{
   
const{civilite,nom,prenom,filiere, niveau, promotion,matricule,matiere,professeur,motif,session,statut}=req.body
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
            motif,
            statut
})
await newReclamation.save()
res.send("Reclamation enregistree avec succes")
    }catch(err){

        console.log(err);
        res.send(`erreur lors de l'enregistrement: ${err}`)
        
    }
}


exports.getReclamationById= async(req,res)=>{
    try{
        const reclamation=await Reclamation.findOne({identifiant:req.params.id})
        if(!reclamation){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })

        }res.render("demandes/reclamation/view",{
            title:"Gestion des demandes - Afficher Reclamation",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Reclamation",url:"/demandes/reclamation"},
                { label: "ID:", url: null }
              ],
              reclamation
        })
    }catch(err){
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
    }
}


exports.deleteReclamation=async(req,res)=>{
    try{
        const deleted=await Reclamation.findOneAndDelete({identifiant:req.params.id})
        if(!deleted){
            res.render("errors/404",{
                title:"Erreur",
                layout:"layouts/main"
            })
        }res.redirect("/demandes/reclamation")
    }catch(err){ 
        res.render("errors/404",{
            title:"Erreur",
            layout:"layouts/main"
        })
        console.log(err)
    }
}
const Frequentation=require("../models/frequentationModel")

exports.createFrequentation=async(req,res)=>{
    try{

        const{civilite,nom, prenom,filiere,niveau,promotion,matricule,periode,destination,statut}=req.body
        const newFrequentaion=new Frequentation({
            civilite,
            nom,
            prenom,
            filiere,
            niveau,
            promotion,
            matricule,
            periode,
            destination,
            statut
        })

        await newFrequentaion.save()
        res.redirect("/demandes/frequentation")
    }catch(err){
        console.log(err);
        res.send(`Erreur lors de l'enregistrement: ${err}`)
    }
    
}

exports.getAllfrequentation=async(req,res)=>{
    try{

        const { q, filiere, statut, niveau } = req.query;
          
        let filter = {};
    
        // Recherche texte
        if (q) {
          filter.$or = [
            { nom: new RegExp(q, "i") },
            { prenom: new RegExp(q, "i") },
            { promotion: new RegExp(q, "i") },
            { matricule: new RegExp(q, "i") }
          ];
        }
    
        // Filtre par niveau
        if (niveau) {
          filter.niveau = niveau;
        }
    
        // Filtre par filiere
        if (filiere) {
          filter.filiere = filiere;
        }
    
        // Filtre par statut
        if (statut) {
          filter.statut = statut;
        }

        const frequentations= await Frequentation.find(filter);
        frequentations.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
        res.render("demandes/frequentation/list",{
            title:"Gestion des demandes - Afficher Diplome",
            layout:"layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Frequentation"},
                { label: "Liste", url: null }
              ],
            frequentations,
        },
    )
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
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Frequentation",url:"/demandes/frequentation"},
                { label: "Afficher", url: null }
              ],
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
        const frequentation=await Frequentation.findOneAndDelete({identifiant:req.params.id})
        if(!frequentation){
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


exports.getFrequentationEditForm = async (req, res) => {
    try {
        const frequentation = await Frequentation.findOne({identifiant: req.params.id});
        if (!frequentation) {
            return res.status(404).send("Demande introuvable");
        }
        res.render("demandes/frequentation/edit", { // Assurez-vous que le chemin est correct
            title: "Gestion des demandes - Modifier Fréquentation",
            layout: "layouts/main",
            breadcrumbs: [
                { label: "Demandes", url: "#" },
                { label: "Type de demande", url: "/demandes" },
                { label: "Fréquentation", url: "/demandes/frequentation" },
                { label: "Modifier", url: null }
            ],
            frequentation 
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
}

exports.updateFrequentation = async (req, res) => {
    try {
        const frequentation = await Frequentation.findOneAndUpdate(
            { identifiant: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!frequentation) {
            return res.status(404).send("Demande introuvable");
        }
        
        res.redirect("/demandes/frequentation");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur lors de la modification");
    }
}
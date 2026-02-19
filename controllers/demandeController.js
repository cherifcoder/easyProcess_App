const Diplome = require("../models/diplomeModel");
const Frequentation = require("../models/frequentationModel");
const Stage = require("../models/stageModel");
const Releve = require("../models/releveModel");
const Reclamation = require("../models/reclamationModel");
const Recommandation = require("../models/recommandationModel");


exports.getAllDemandes = async (req, res) => {
  try {
    const { q, filiere, statut, niveau, type } = req.query;

    // Construction du filtre générique
    let filter = {};

    // Recherche texte libre
    if (q) {
      filter.$or = [
        { nom: new RegExp(q, "i") },
        { prenom: new RegExp(q, "i") },
        { promotion: new RegExp(q, "i") },
        { identifiant: new RegExp(q, "i") }
      ];
    }

    if (filiere) filter.filiere = filiere;
    if (statut) filter.statut = statut;
    if (niveau) filter.niveau = niveau;

    // Récupération des données selon le type demandé
    let demandes = [];

    if (!type || type === "Diplome") {
      const diplomes = await Diplome.find(filter);
      diplomes.forEach(d => {
        demandes.push({
          type: "Diplome",
          date: d.date,
          identifiant: d.identifiant,
          demandeur: `${d.nom} ${d.prenom}`,
          filiere: d.filiere,
          niveau: d.niveau,
          promotion: d.promotion,
          statut: d.statut,
        });
      });
    }

    if (!type || type === "Frequentation") {
      const frequentations = await Frequentation.find(filter);
      frequentations.forEach(f => {
        demandes.push({
          type: "Frequentation",
          date: f.date,
          identifiant: f.identifiant,
          demandeur: `${f.nom} ${f.prenom}`,
          filiere: f.filiere,
          niveau: f.niveau,
          promotion: f.promotion,
          statut: f.statut,
        });
      });
    }

    if (!type || type === "Stage") {
      const stages = await Stage.find(filter);
      stages.forEach(s => {
        demandes.push({
          type: "Stage",
          date: s.date,
          identifiant: s.identifiant,
          demandeur: `${s.nom} ${s.prenom}`,
          filiere: s.filiere,
          niveau: s.niveau,
          promotion: s.promotion,
          statut: s.statut,
        });
      });
    }

    if (!type || type === "Releve") {
      const releves = await Releve.find(filter);
      releves.forEach(r => {
        demandes.push({
          type: "Releve",
          date: r.date,
          identifiant: r.identifiant,
          demandeur: `${r.nom} ${r.prenom}`,
          filiere: r.filiere,
          niveau: r.niveau,
          promotion: r.promotion,
          statut: r.statut,
        });
      });
    }

    if (!type || type === "Reclamation") {
      const reclamations = await Reclamation.find(filter);
      reclamations.forEach(r => {
        demandes.push({
          type: "Reclamation",
          date: r.date,
          identifiant: r.identifiant,
          demandeur: `${r.nom} ${r.prenom}`,
          filiere: r.filiere,
          niveau: r.niveau,
          promotion: r.promotion,
          statut: r.statut,
        });
      });
    }

    if (!type || type === "Recommandation") {
      const recommandations = await Recommandation.find(filter);
      recommandations.forEach(r => {
        demandes.push({
          type: "Recommandation",
          date: r.date,
          identifiant: r.identifiant,
          demandeur: `${r.nom} ${r.prenom}`,
          filiere: r.filiere,
          niveau: r.niveau,
          promotion: r.promotion,
          statut: r.statut,
        });
      });
    }

    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "Liste", url: null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404", {
      title: "Erreur",
      layout: "layouts/main"
    });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    // Fonction utilitaire pour compter par statut sur un modèle
    const countByStatut = async (Model, statut) => {
      return await Model.countDocuments({ statut });
    };

    // Compteurs globaux
    const totalDemandes =
      (await Diplome.countDocuments()) +
      (await Frequentation.countDocuments()) +
      (await Stage.countDocuments()) +
      (await Releve.countDocuments()) +
      (await Reclamation.countDocuments()) +
      (await Recommandation.countDocuments());

    const totalValidees =
      (await countByStatut(Diplome, "Validee")) +
      (await countByStatut(Frequentation, "Validee")) +
      (await countByStatut(Stage, "Validee")) +
      (await countByStatut(Releve, "Validee")) +
      (await countByStatut(Reclamation, "Validee")) +
      (await countByStatut(Recommandation, "Validee"));

    const totalRejetees =
      (await countByStatut(Diplome, "Rejetee")) +
      (await countByStatut(Frequentation, "Rejetee")) +
      (await countByStatut(Stage, "Rejetee")) +
      (await countByStatut(Releve, "Rejetee")) +
      (await countByStatut(Reclamation, "Rejetee")) +
      (await countByStatut(Recommandation, "Rejetee"));

    const totalEnAttente =
      (await countByStatut(Diplome, "En attente")) +
      (await countByStatut(Frequentation, "En attente")) +
      (await countByStatut(Stage, "En attente")) +
      (await countByStatut(Releve, "En attente")) +
      (await countByStatut(Reclamation, "En attente")) +
      (await countByStatut(Recommandation, "En attente"));

 // Récupération des 10 dernières demandes (tous types confondus)
 let demandes = [];

 const models = [
   { model: Diplome, type: "Diplome" },
   { model: Frequentation, type: "Frequentation" },
   { model: Stage, type: "Stage" },
   { model: Releve, type: "Releve" },
   { model: Reclamation, type: "Reclamation" },
   { model: Recommandation, type: "Recommandation" },
 ];

 for (const { model, type } of models) {
   const docs = await model.find().sort({ date: -1 }).limit(10);
   docs.forEach(d => {
     demandes.push({
       type,
       date: d.date,
       identifiant: d.identifiant,
       demandeur: `${d.nom} ${d.prenom}`,
       filiere: d.filiere,
       niveau: d.niveau,
       promotion: d.promotion,
       statut: d.statut,
     });
   });
 }

 // Tri global par date et limitation à 10
 demandes.sort((a, b) => new Date(b.date) - new Date(a.date));
 demandes = demandes.slice(0, 10);


      
    // Rendu vers le dashboard
    res.render("pages/dashboard", {
      title: "Tableau de bord",
      layout: "layouts/main",
      stats: {
        totalDemandes,
        totalValidees,
        totalRejetees,
        totalEnAttente,
      },
      demandesRecentes: demandes, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404", {
      title: "Erreur",
      layout: "layouts/main",
    });
  }
};
 

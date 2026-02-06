const Diplome = require("../models/diplomeModel");
const Frequentation = require("../models/frequentationModel");
const Stage = require("../models/stageModel");
const Releve = require("../models/releveModel");
const Reclamation = require("../models/reclamationModel");
const Recommandation = require("../models/recommandationModel");


exports.getAllDemandes = async (req, res) => {
  try {
    const diplomes = await Diplome.find();
    const frequentations = await Frequentation.find();
    const stages = await Stage.find();
    const releves = await Releve.find();
    const reclamations = await Reclamation.find();
    const recommandations = await Recommandation.find();


    let demandes = [];

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

    stages.forEach(d => {
      demandes.push({
        type: "Stage",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });

    releves.forEach(d => {
      demandes.push({
        type: "Releve",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    reclamations.forEach(d => {
      demandes.push({
        type: "Reclamation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    recommandations.forEach(d => {
      demandes.push({
        type: "Recommandation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });



    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation après tri
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "Liste", url:null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404",{
      title:"Erreur",
      layout:"layouts/main"
  });
  }
};



exports.getValidatedRequests = async (req, res) => {
  try {
    const diplomes = await Diplome.find({ statut: "Validee" });
    const frequentations = await Frequentation.find({ statut: "Validee" });
    const stages = await Stage.find({ statut: "Validee" });
    const releves = await Releve.find({ statut: "Validee" });
    const reclamations = await Reclamation.find({ statut: "Validee" });
    const recommandations = await Recommandation.find({ statut: "Validee" });


    let demandes = [];

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

    stages.forEach(d => {
      demandes.push({
        type: "Stage",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });

    releves.forEach(d => {
      demandes.push({
        type: "Releve",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    reclamations.forEach(d => {
      demandes.push({
        type: "Reclamation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    recommandations.forEach(d => {
      demandes.push({
        type: "Recommandation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });



    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation après tri
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/rejet/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "Rejetees", url:null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404",{
      title:"Erreur",
      layout:"layouts/main"
  });
  }
};




exports.getPendingRequests = async (req, res) => {
  try {
    const diplomes = await Diplome.find({ statut: "En attente" });
    const frequentations = await Frequentation.find({ statut: "En attente" });
    const stages = await Stage.find({ statut: "En attente" });
    const releves = await Releve.find({ statut: "En attente" });
    const reclamations = await Reclamation.find({ statut: "En attente" });
    const recommandations = await Recommandation.find({ statut: "En attente" });


    let demandes = [];

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

    stages.forEach(d => {
      demandes.push({
        type: "Stage",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });

    releves.forEach(d => {
      demandes.push({
        type: "Releve",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    reclamations.forEach(d => {
      demandes.push({
        type: "Reclamation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    recommandations.forEach(d => {
      demandes.push({
        type: "Recommandation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });



    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation après tri
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/rejet/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "EN attentes", url:null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404",{
      title:"Erreur",
      layout:"layouts/main"
  });
  }
};


exports.getvalidatedRequests = async (req, res) => {
  try {
    const diplomes = await Diplome.find({ statut: "Validee" });
    const frequentations = await Frequentation.find({ statut: "Validee" });
    const stages = await Stage.find({ statut: "Validee" });
    const releves = await Releve.find({ statut: "Validee" });
    const reclamations = await Reclamation.find({ statut: "Validee" });
    const recommandations = await Recommandation.find({ statut: "Validee" });


    let demandes = [];

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

    stages.forEach(d => {
      demandes.push({
        type: "Stage",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });

    releves.forEach(d => {
      demandes.push({
        type: "Releve",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    reclamations.forEach(d => {
      demandes.push({
        type: "Reclamation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    recommandations.forEach(d => {
      demandes.push({
        type: "Recommandation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });



    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation après tri
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/rejet/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "Rejetees", url:null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404",{
      title:"Erreur",
      layout:"layouts/main"
  });
  }
};




exports.getRejectedRequests = async (req, res) => {
  try {
    const diplomes = await Diplome.find({ statut: "Rejetee" });
    const frequentations = await Frequentation.find({ statut: "Rejetee" });
    const stages = await Stage.find({ statut: "Rejetee" });
    const releves = await Releve.find({ statut: "Rejetee" });
    const reclamations = await Reclamation.find({ statut: "Rejetee" });
    const recommandations = await Recommandation.find({ statut: "Rejetee" });


    let demandes = [];

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

    stages.forEach(d => {
      demandes.push({
        type: "Stage",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });

    releves.forEach(d => {
      demandes.push({
        type: "Releve",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    reclamations.forEach(d => {
      demandes.push({
        type: "Reclamation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });
    recommandations.forEach(d => {
      demandes.push({
        type: "Recommandation",
        date: d.date,
        identifiant: d.identifiant,
        demandeur: `${d.nom} ${d.prenom}`,
        filiere: d.filiere,
        niveau: d.niveau,
        promotion: d.promotion,
        statut: d.statut,
      });
    });



    // Tri par date décroissante
    demandes.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Numérotation après tri
    demandes.forEach((d, index) => {
      d.no = index + 1;
    });

    res.render("demandes/rejet/list", {
      title: "Gestion des demandes - Toutes les demandes",
      layout: "layouts/main",
      breadcrumbs: [
        { label: "Demandes", url: "#" },
        { label: "Rejetees", url:null },
      ],
      demandes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/404",{
      title:"Erreur",
      layout:"layouts/main"
  });
  }
};



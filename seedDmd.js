const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

// Import de tous tes modèles
const Admin = require("./models/adminModel");
const Diplome = require("./models/diplomeModel");
const Etudiant = require("./models/etudiantModel");
const Frequentation = require("./models/frequentationModel");
const Reclamation = require("./models/reclamationModel");
const Recommandation = require("./models/recommandationModel");
const Releve = require("./models/releveModel");
const Stage = require("./models/stageModel");

mongoose.connect("mongodb+srv://jinx:12345@cluster0.dra9pus.mongodb.net/");

async function seedAll() {
  try {
    // Nettoyage des collections
    await Promise.all([
      Admin.deleteMany(),
      Diplome.deleteMany(),
      Etudiant.deleteMany(),
      Frequentation.deleteMany(),
      Reclamation.deleteMany(),
      Recommandation.deleteMany(),
      Releve.deleteMany(),
      Stage.deleteMany(),
    ]);

    // Génération Admins
    const admins = Array.from({ length: 5 }).map(() => ({
      nom: faker.person.lastName({length:4}),
      prenom: faker.person.firstName({length:4}),
      dateNaissance: faker.date.birthdate({ min: 30, max: 60, mode: "age" }),
      sexe: faker.helpers.arrayElement(["Homme", "Femme"]),
      adresse: faker.location.streetAddress({length:4}),
      telephone: faker.phone.number({length:5}),
      email: faker.internet.email({length:4}),
      motDePass: "1234",
      poste: faker.helpers.arrayElement(["DG", "DGA", "Secretaire"]),
      role: faker.helpers.arrayElement(["Directeur", "Secretaire"]),
    }));

    // Génération Étudiants
    const etudiants = Array.from({ length: 4 }).map(() => {
      const promo = faker.number.int({ min: 2015, max: 2026 });
      return {
        nom: faker.person.lastName({length:3}),
        prenom: faker.person.firstName({length:3}),
        dateNaissance: faker.date.birthdate({ min: 18, max: 25, mode: "age" }),
        sexe: faker.helpers.arrayElement(["Homme", "Femme"]),
        adresse: faker.location.streetAddress({length:4}),
        telephone: faker.phone.number({length:5}),
        filiere: faker.helpers.arrayElement(["AB", "AG", "CFA", "3ER", "GI", "HT", "MA", "MC"]),
        email: faker.internet.email({length:5}),
        niveau: faker.helpers.arrayElement(["L1", "L2", "L3"]),
        promotion: promo,
        matricule: faker.string.alphanumeric(4).toUpperCase(),
        motDePass: "1234",
      };
    });

    // Diplômes
    const diplomes = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      diplome: faker.helpers.arrayElement(["DUT", "Licence"]),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Fréquentations
    const frequentations = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      periode: [faker.date.past().toISOString().split("T")[0]],
      destination: faker.helpers.arrayElement(["bourse", "emploi", "stage"]),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Réclamations
    const reclamations = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      session: faker.helpers.arrayElement(["SN_S1","SN_S2","SN_S3","SR_S1","SR_S2"]),
      matiere: faker.word.words(2),
      professeur: faker.person.fullName(),
      motif: faker.helpers.arrayElement(["calcul","saisie","absence"]),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Recommandations
    const recommandations = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      type: faker.word.words(1),
      destinataire: faker.company.name(),
      programme: faker.word.words(2),
      infoSupplementaire: faker.lorem.sentence(),
      professeur: faker.person.fullName(),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Relevés
    const releves = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      semestre: faker.helpers.arrayElements(["S1","S2","S3","S4","S5","S6"], { min: 1, max: 2 }),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Stages
    const stages = etudiants.slice(0, 5).map((et) => ({
      civilite: faker.helpers.arrayElement(["M.", "Mme", "Mlle"]),
      nom: et.nom,
      prenom: et.prenom,
      filiere: et.filiere,
      niveau: et.niveau,
      promotion: et.promotion,
      matricule: et.matricule,
      type: faker.helpers.arrayElement(["dut","licence","perfectionnement"]),
      entreprise: faker.company.name(),
      maitredeStage: faker.person.fullName(),
      adresse: faker.location.streetAddress(),
      encadrant: faker.person.fullName(),
      duree: faker.helpers.arrayElement(["2 Mois","3 Mois","6 Mois"]),
      statut: faker.helpers.arrayElement(["En attente", "Validee", "Rejetee"]),
    }));

    // Insertion en base avec create() pour déclencher les hooks
    for (const admin of admins) await Admin.create(admin);
    for (const et of etudiants) await Etudiant.create(et);
    for (const d of diplomes) await Diplome.create(d);
    for (const f of frequentations) await Frequentation.create(f);
    for (const r of reclamations) await Reclamation.create(r);
    for (const rec of recommandations) await Recommandation.create(rec);
    for (const rl of releves) await Releve.create(rl);
    for (const st of stages) await Stage.create(st);

    console.log("✅ Toutes les collections ont été remplies avec des données fictives avec identifiants auto-incrémentés !");
  } catch (err) {
    console.error("Erreur lors du seed :", err);
  } finally {
    mongoose.connection.close();
  }
}

seedAll();

// utils/applyCounter.js
const Counter = require("../models/counterModel");

/**
 * Middleware générique pour incrémenter un compteur par modèle
 * @param {Schema} schema - Schéma mongoose
 * @param {String} counterName - Nom du compteur (ex: "etudiant", "releve")
 * @param {Function} formatter - Fonction qui reçoit seq et doc, retourne identifiant formaté
 */
function applyCounter(schema, counterName, formatter) {
  schema.pre("save", async function () {
    if (!this.identifiant) {
      const counter = await Counter.findOneAndUpdate(
        { name: counterName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      this.identifiant = formatter(counter.seq, this);
    }
  });
}

module.exports = applyCounter;

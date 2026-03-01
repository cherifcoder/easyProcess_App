const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const Etudiant = require("../models/etudiantModel");

exports.login = async (req, res) => {
  try {
    const { email, motDePass } = req.body;

    // Cherche dans les deux collections en parallèle
    const [admin, etudiant] = await Promise.all([
      Admin.findOne({ email }),
      Etudiant.findOne({ email })
    ]);

    const user = admin || etudiant;
    if (!user) return res.send("Utilisateur introuvable");

    const isMatch = await bcrypt.compare(motDePass, user.motDePass);
    if (!isMatch) return res.send("Mot de passe incorrect");

    // Redirection selon le rôle
    if (user.role === "Directeur"||user.role === "Secretaire") {
      res.redirect("/dashboard");       // Admin → Dashboard
    } else {
      res.redirect("/mes-demandes");    // Étudiant → Mes demandes
    }
  } catch (err) {
    res.send(`Erreur lors de la connexion : ${err}`);
  }
};

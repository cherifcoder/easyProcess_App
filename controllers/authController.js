const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const Etudiant = require("../models/etudiantModel");
const logger = require("../utils/logger");

exports.login = async (req, res) => {
  try {
    const { email, motDePass } = req.body;

    const [admin, etudiant] = await Promise.all([
      Admin.findOne({ email }),
      Etudiant.findOne({ email })
    ]);

    const user = admin || etudiant;
    if (!user) {
      logger.warn(`Tentative de connexion échouée : utilisateur introuvable (${email})`);
      return res.send("Utilisateur introuvable");
    }

    const isMatch = await bcrypt.compare(motDePass, user.motDePass);
    if (!isMatch) {
      logger.warn(`Mot de passe incorrect pour ${email}`);
      return res.send("Mot de passe incorrect");
    }

    req.session.user = {
      _id: user._id,
      id: user.identifiant,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
      type: admin ? "admin" : "etudiant"
    };

    logger.info(`Connexion réussie : ${user.nom} ${user.prenom} (${user.role})`);

    if (user.role === "Directeur" || user.role === "Secretaire") {
      res.redirect("/dashboard");
    } else {
      res.redirect("/mesDemandes/list");
    }
  } catch (err) {
    logger.error("Erreur lors de la connexion", { error: err.message });
    res.send(`Erreur lors de la connexion : ${err}`);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      logger.error("Erreur lors de la déconnexion", { error: err.message });
      return res.send("Erreur lors de la déconnexion");
    }
    logger.info("Déconnexion réussie");
    res.redirect("/");
  });
};

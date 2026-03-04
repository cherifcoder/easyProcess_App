const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const Etudiant = require("../models/etudiantModel");

exports.login = async (req, res) => {
  try {
    const { email, motDePass } = req.body;

    const [admin, etudiant] = await Promise.all([
      Admin.findOne({ email }),
      Etudiant.findOne({ email })
    ]);

    const user = admin || etudiant;
    if (!user) return res.send("Utilisateur introuvable");

    const isMatch = await bcrypt.compare(motDePass, user.motDePass);
    if (!isMatch) return res.send("Mot de passe incorrect");

    // Stocker l'utilisateur dans la session
    req.session.user = {
      _id: user._id,
      id: user.identifiant,
      role: user.role,
      nom: user.nom,
      prenom: user.prenom,
      type: admin ? "admin" : "etudiant"
    };

    // Redirection selon le rôle
    if (user.role === "Directeur" || user.role === "Secretaire") {
      res.redirect("/dashboard");
    } else {
      res.redirect("/mesDemandes/list");
    }
  } catch (err) {
    res.send(`Erreur lors de la connexion : ${err}`);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send("Erreur lors de la déconnexion");
    res.redirect("/");
  });
};

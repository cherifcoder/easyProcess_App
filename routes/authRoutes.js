const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Connexion"
    // si tu utilises un layout spécifique, ajoute : layout: "layouts/auth"
  });
});

// Route POST /login
router.post("/login", login);
router.get("/logout", logout)

module.exports = router;

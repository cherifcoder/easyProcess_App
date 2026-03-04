exports.isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/");
    }
    next();
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.session.user && (req.session.user.role === "Directeur" || req.session.user.role === "Secretaire")) {
      return next();
    }
    res.status(403).send("Accès interdit");
  };
  
  exports.isEtudiant = (req, res, next) => {
    if (req.session.user && req.session.user.type === "etudiant") {
      return next();
    }
    res.status(403).send("Accès interdit");
  };
  
  exports.isDirecteur = (req, res, next) => {
    if (req.session.user && req.session.user.role === "Directeur") {
      return next();
    }
    res.status(403).send("Accès interdit : seul le Directeur peut signer.");
  };
  
require("dotenv").config()

const express=require('express')
const PORT=process.env.PORT || 5000
const bodyparser=require('body-parser')
const path=require('path')
const connectDB=require("./config/db")

const etudiantRoutes=require("./routes/etudiantRoutes")
const demandesRoutes=require("./routes/demandesRoutes")
const diplomeRoutes=require("./routes/diplomeRoutes")
const frequentationRoutes=require("./routes/frequentationRoutes")
const reclamationRoutes=require("./routes/reclamationRoutes")
const recommandationRoutes=require("./routes/recommandationRoutes")
const releveRoutes=require("./routes/releveRoutes")
const stageRoutes=require("./routes/stageRoutes")
const adminRoutes = require('./routes/adminRoutes')
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");






const expressLayout=require('express-ejs-layouts')

  
const app=express()
app.set("layout","./layouts/auth") 
app.use(expressLayout)
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyparser.urlencoded({extend:true}))
const logger = require('./utils/logger');
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // mettre true si HTTPS
  }));
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });
  app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
  });
  app.use((req, res, next) => {
    logger.info(`Requête: ${req.method} ${req.url}`, { ip: req.ip });
    next();
  });
  
  app.use((err, req, res, next) => {
    logger.error(`Erreur: ${err.message}`, { stack: err.stack });
    res.status(500).send('Erreur serveur');
  });
  app.use((req, res, next) => {
    logger.info(`Requête: ${req.method} ${req.url}`, { ip: req.ip });
    next();
  });

connectDB()


app.use("/", etudiantRoutes)  
app.use("/",demandesRoutes)
app.use("/",diplomeRoutes)
app.use("/",frequentationRoutes)
app.use("/",reclamationRoutes)
app.use("/",recommandationRoutes)
app.use("/",releveRoutes)
app.use("/",stageRoutes)
app.use('/', adminRoutes)
app.use("/", authRoutes);
app.listen(PORT ,(err)=>{
    if(!err){
        console.log(`App listen on http://localhost:${PORT}`)
    }else{ 
        console.log(`Erreur lors de l'ecoute du port ${PORT} ${err}`);
        
    }
}) 
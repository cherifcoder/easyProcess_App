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


const expressLayout=require('express-ejs-layouts')

  
const app=express()
app.set("layout","./layouts/auth") 
app.use(expressLayout)
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyparser.urlencoded({extend:true}))


connectDB()


app.use("/", etudiantRoutes)  
app.use("/",demandesRoutes)
app.use("/",diplomeRoutes)
app.use("/",frequentationRoutes)
app.use("/",reclamationRoutes)
app.use("/",recommandationRoutes)
app.use("/",releveRoutes)
app.use("/",stageRoutes)
app.listen(PORT ,(err)=>{
    if(!err){
        console.log(`App listen on http://localhost:${PORT}`)
    }else{ 
        console.log(`Erreur lors de l'ecoute du port ${PORT}`);
        
    }
}) 
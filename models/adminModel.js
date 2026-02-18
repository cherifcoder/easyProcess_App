const mongoose = require("mongoose")
const conteur=require("../middleware/conteur")
  
const adminSchema = new mongoose.Schema({
    identifiant:{
        type:String,
        unique:true
    },
    nom: {
        type: String,
        require: true,
    },
    prenom: {
        type: String,
        require: true,
    },
    dateNaissance: {
        type: Date,
        require: true,
    },
    sexe: {
        type: String,
        enum: ['Homme', 'Femme'],
        require: true
    },
    adresse: {
        type: String,
        require: true,
    },
    telephone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    motDePass: {
        type: String,
        require: true
    },
    poste:{
        type:String,
        enum:['DG', 'DGA', 'Secretaire']
    },
    role:{
        type:String,
        enum: ['Directeur', 'Secretaire'], 
        default:'Secretaire', 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }


},{ timestamps: true });

conteur(adminSchema,"admin", (seq,doc)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `ADM-${numFormat}`
})

module.exports=mongoose.model("Admin", adminSchema) 
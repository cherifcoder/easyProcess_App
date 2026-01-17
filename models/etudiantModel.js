const mongoose = require("mongoose")
const conteur=require("../middleware/conteur")
  
const etudiantSchema = new mongoose.Schema({
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
        match: [/^\+?[0-9]{7,15}$/, 'Numéro de téléphone invalide']
    },
    filiere: {
        type: String,
        enum: ['AB', 'AG', 'CFA', '3ER', 'GI', 'HT', 'MA', 'MC'],
        required: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    niveau: {
        type: String,
        enum: ['L1', 'L2', 'L3'],
        required: true
    },
    promotion:{
        type: String,
        require: true,
        min:2015,
        max:2026
    },
    matricule: {
        type: String,
        require: true,
        unique: true
    },
    motDePass: {
        type: String,
        require: true
    },
    role:{
        type:String,
        enum: ['etudiant','admin'], 
        default:'etudiant', 
    },
    identifiant:{
        type:String,
        unique:true
    }

},{ timestamps: true });

conteur(etudiantSchema,"etudiant", (seq,doc)=>{
    const numFormat=String(seq).padStart(3,"0")
    const filiereCode=doc.filiere.toUpperCase()
    const promoShort=String(doc.promotion).slice(-2)
    return `ETD-${numFormat}-${filiereCode}-${promoShort}`
})

module.exports=mongoose.model("Etudiant", etudiantSchema) 
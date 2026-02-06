const mongoose=require("mongoose")
const compteur=require("../middleware/conteur")

const stageSchema=new mongoose.Schema({
    identifiant:{
        type:String,
        unique:true
    },
    civilite:{
        type: String,
        require:true,
        enum:["M.", "Mme", "Mlle"]
    },
    
    nom:{
    type:String,
    require:true
    },
    prenom: {
        type: String,
        require: true,
    },
    filiere: {
        type: String,
        enum: ['AB', 'AG', 'CFA', '3ER', 'GI', 'HT', 'MA', 'MC'],
        required: true
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
    },
    type:{
        type:String,
        enum:['dut','licence','perfectionnement']
    },
    
    entreprise:{
        type:String
    },
    maitredeStage:{
        type:String
    },
    adresse:{
        type:String
    },
    encadrant:{
        type:String
    },
    duree:{
        type:String
    },
    statut:{
        type:String,
        require:true,
        enum:["En attente", "Validee", "Rejetee"],
        default:"En attente"
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
},{timestamps:true})

compteur(stageSchema,'stage',(seq)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `DMD-STG-${numFormat}`
})

  module.exports=mongoose.model("Stage", stageSchema)
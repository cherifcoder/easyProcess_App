const mongoose=require('mongoose')
const conteur=require('../middleware/conteur')

const releveSchema=new mongoose.Schema({
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
    semestre:{
        type:[String],
        enum:["S1","S2","S3","S4","S5","S6"],
        default:[]
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

conteur(releveSchema,"releve",(seq)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `DMD-RLV-${numFormat}`
})

  module.exports=mongoose.model("Releve", releveSchema)


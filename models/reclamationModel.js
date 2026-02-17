const mongoose=require("mongoose")
const compteur=require("../middleware/conteur")

const reclamationSchema=new mongoose.Schema({
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
    session:{
        type:String,
        enum:["SN_S1","SN_S2","SN_S3","SN_S4","SN_S5","SR_S1","SR_S2","SR_S3","SR_S4","SR_S5"],
        
    },
    matiere:{
        type:String
    },
    professeur:{
        type:String
    },
    motif:{
        type:String,
        enum:["calcul","saisie","absence"]
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

compteur(reclamationSchema,'reclamation',(seq)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `DMD-RECL-${numFormat}`
})

module.exports=mongoose.model("Reclamation",reclamationSchema)
const nongoose= require("mongoose")
const conteur=require("../middleware/conteur")
const { default: mongoose } = require("mongoose")

const frequentationSchema= new mongoose.Schema({
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
    periode:{
        type:[String],
    },

    destination:{
        type:String,
        enum:["bourse","emploi", "stage"]
    },

    statut:{
        type:String,
        enum:["En attente", "validee","Rejetee" ],
        default:"En attente"
    }
},{timeStamps:true}
)
conteur(frequentationSchema,"frequentation", (seq)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `DMD-FRQ-${numFormat}`
})

module.exports=mongoose.model("Frequentation", frequentationSchema)
const mongoose=require("mongoose")
const conteur= require("../middleware/conteur")

const diplomeSchema= new mongoose.Schema({
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
    diplome:{
        type:String,
        enum:["DUT","Licence"]
    },
    statut:{
        type:String,
        enum:["En attente", "validee","Rejetee" ],
        default:"En attente"
    }
},{timestamps:true}
)

conteur (diplomeSchema,"diplome",(seq)=>{
    const numFormat=String(seq).padStart(3,"0")
    return `DMD-DPL-${numFormat}`
})

module.exports=mongoose.model("Diplome", diplomeSchema)
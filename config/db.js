const mongoose=require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const connectDB= async()=>{
    try{
        await mongoose.connect(MONGODB_URI)
        console.log(`Connexion reussi a la base de donnee`);
        
    }catch(err){ 
        console.log(`erreur lors de la connexion a la base de donne :${err}`)
        process.exit(1)
    }
}

module.exports=connectDB
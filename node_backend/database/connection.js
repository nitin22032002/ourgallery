const mongoose=require("mongoose")

const connectDb=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Connected With Database...")
    }).catch((err)=>{
        console.log("Database Connection Error",err)
    })

}

module.exports=connectDb;
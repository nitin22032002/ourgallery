const mongoose=require("mongoose")

const imageModel=new mongoose.Schema({

        image_name:{
            type:String,
            required:true,
            unique:true,
        },
        image_url:{
            type:String,
            required:true,
            unique:true,
        },
        image_details:{
            type:String,
            required:true
        },
        add_date:{
            type:Date,
            default:Date.now
        },
        image_like:{
            type:Boolean,
            default:false
        }
})

module.exports = mongoose.model("Image" , imageModel);
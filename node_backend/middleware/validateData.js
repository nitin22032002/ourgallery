const imageModel=require("../database/imageDb");
const axios=require("axios")
const throwError=require("../middleware/error")
const validateUrl=async(req,res,next)=>{
    try{
        let res=await axios.get(req.body.image_url);
        next()
    }
    catch(e){
        // console.log(e)
        return res.status(400).json({status:false,err:"Invalid Url"})
    }
}

const isUnique=async(req,res,next)=>{
    try{
        let {image_name}=req.body;
        let image=await imageModel.findOne({image_name})
        if(image)
            return res.status(400).json({status:false,err:"Name already Exist"})
        next()
        }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

module.exports={isUnique,validateUrl};
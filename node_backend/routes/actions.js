const imageModel=require("../database/imageDb")
const decodeUrl=require("../middleware/decodeUrl")
const throwError=require("../middleware/error")

const addImage=async(req,res,next)=>{
    try{
        let {image_name,image_url,image_details}=req.body;
        let image=await imageModel.create({image_name,image_url,image_details});
        return res.status(200).json({status:true,imageId:image._id})
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

const editImage=async(req,res,next)=>{
    try{
        let {image_name,image_url,image_details}=req.body;
        let imageId=req.params.id;
        let image=await imageModel.findById(imageId);
        if(!image){
            throwError(res,401)
        }
        image.image_name=image_name;
        image.image_url=image_url;
        image.image_details=image_details;
        await image.save();
        return res.status(200).json({status:true,imageId})
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

const deleteImage=async(req,res,next)=>{
    try{

        let imageId=req.params.id;
        let image=await imageModel.findById(imageId);
        if(!image){
            throwError(res,401)
        }
        await imageModel.deleteOne({_id:imageId})
        return res.status(200).json({status:true,imageId})
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

const getImages=async(req,res,next)=>{
    try{
        let pageNo=req.query.pageno;
        let per_page=parseInt(process.env.PER_PAGE);
        let image=await imageModel.find({}).skip((pageNo-1)*per_page).limit(per_page);
        image=decodeUrl(image)
        if(image)
            return res.status(200).json({status:true,image:image,per_page,count:image.length})
        throwError(res,500)
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}


const getImage=async(req,res,next)=>{
    try{
        let imageId=req.params.id;
        let image=await imageModel.findById(imageId);
        if(!image){
            throwError(res,401)
        }
        image=decodeUrl([image])
        if(image)
            return res.status(200).json({status:true,image:image[0]})
        throwError(res,500)
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

const pagination=async(req,res,next)=>{
    try{
        let count=await imageModel.count()
        let per_page=parseInt(process.env.PER_PAGE);
        return res.status(200).json({status:true,per_page,total:count,pages:Math.ceil(count/per_page)})
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

const LikeImage=async(req,res,next)=>{
    try{
        let imageId=req.params.id;
        let image=await imageModel.findById(imageId);
        if(!image){
            throwError(res,401)
        }
        image.image_like=!image.image_like;
        await image.save();
        return res.status(200).json({status:true,imageId})
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

module.exports={addImage,LikeImage,getImages,getImage,editImage,deleteImage,pagination};


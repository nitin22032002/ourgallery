const express=require("express")

const router=express.Router()

const encodeUrl=require("../middleware/encodeUrl")

const {isUnique,validateUrl}=require("../middleware/validateData")

const {addImage,getImages,getImage,editImage,deleteImage,pagination, LikeImage}=require("../routes/actions")

router.post("/",isUnique,validateUrl,encodeUrl,addImage);

router.put("/edit/:id",validateUrl,encodeUrl,editImage);

router.delete("/delete/:id",deleteImage);

router.get("/show/:id",getImage);

router.get("/like/:id",LikeImage);

router.get("/",getImages);

router.get("/pagination",pagination);

module.exports=router;
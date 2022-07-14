const jwt=require("jsonwebtoken")
const throwError=require("./error")

const encodeUrl=(req,res,next)=>{
    try{
        let url=req.body.image_url;
        url=jwt.sign({url},process.env.JWT_STRING);
        req.body.image_url=url;
        next()
    }
    catch(e){
        console.log(e)
        throwError(res,500)
    }
}

module.exports=encodeUrl;
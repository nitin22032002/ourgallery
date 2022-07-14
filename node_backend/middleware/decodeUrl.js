const jwt=require("jsonwebtoken")

const decodeUrl=(data)=>{
    try{
        for(let i=0;i<data.length;i++){
            let image=data[i];
            let url=image.image_url;
            url=jwt.verify(url,process.env.JWT_STRING);
            image.image_url=url.url;
        }
        return data;
    }
    catch(e){
        console.log(e)
        return null;
    }
}

module.exports=decodeUrl;
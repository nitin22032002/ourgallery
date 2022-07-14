const SERVER_URL="https://ourgallery.herokuapp.com"

const getRequest=async(url,method)=>{
    try{
         let res=await fetch(`${SERVER_URL}${url}`,{
            method,
            headers:{"content-type":"application/json"}, 
         })
         res=await res.json();
         return res;
    }
    catch(e){
        console.log(e)
        return null;
    }
}

const bodyRequest=async(url,body,method)=>{
    try{
        let res=await fetch(`${SERVER_URL}${url}`,{
           method,
           headers:{"content-type":"application/json"}, 
           body:JSON.stringify(body)
        })
        res=await res.json();
        return res;
   }
   catch(e){
       console.log(e)
       return null;
   }    
}

export {SERVER_URL,getRequest,bodyRequest};
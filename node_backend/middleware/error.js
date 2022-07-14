const throwError=(res,status_code)=>{
    return res.status(status_code).json({status:false})
}

module.exports=throwError;
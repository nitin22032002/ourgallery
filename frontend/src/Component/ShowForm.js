import React, { useContext, useEffect,useState } from 'react'
import {Grid,Button,TextField} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import { getRequest } from '../API/server'
import ContextMain from '../Context/MainContext'
export default function ShowForm() {
  const history=useHistory()
  const context=useContext(ContextMain)
  const [getId,setId]=useState(null)
  const [getImage,setImage]=useState({image_like:false,_id:"",image_name:"",image_url:"",image_details:"",add_date:""})
  if(getId===null){
    let id=String(history.location.pathname).split("/").pop()
    setId(id)
  }
  const getImages=async()=>{
    context.setOpen(true)
    let res=await getRequest(`/show/${getId}`,"get")
    if(res.status){
      setImage(res.image)
    }
    else{
      window.location.href="/"
    }
    context.setOpen(false)
  }
  const handleDelete=async()=>{
    try{
        let status=window.confirm("Are You Sure You Want To Delete Image")
        if(status){
          context.setOpen(true)
            let res=await getRequest(`/delete/${getId}`,"delete")
            if(res.status){
                alert("Image Deleted SucessFully")
                context.setOpen(false)
                window.location.href="/"
            }
            else{
                alert("Server Error...")
            }
        }
        context.setOpen(false)
    }
    catch(e){
        alert("Server Error...")
    }
  }
  useEffect(()=>{
      getImages()
      // eslint-disable-next-line 
  },[])

  return (
        <div style={{cursor:"default",display:"flex",width:"95%",justifyContent:"center",margin:20}}>
      <Grid containor style={{border:"1px solid black",padding:10,width:"50%",borderRadius:20}}>
        <Grid item xs={12} style={{fontSize:30,textAlign:"center",fontStyle:"italic",fontWeight:"600",margin:20}}>
            Image ({getId})
        </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField fullWidth disabled={true} variant="outlined" label="Image Name" value={getImage.image_name} />
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField fullWidth disabled={true} variant="outlined" label="Image Post Date" value={getImage.add_date} />
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField disabled={true} multiline rows={2}  fullWidth variant="outlined" label="Image URL" value={getImage.image_url} />
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField disabled={true} multiline rows={2}  fullWidth variant="outlined" label="Image Details" value={getImage.image_details}/>
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <img style={{width:"100%"}} src={getImage.image_url} alt="..."/>
           </Grid>
           <Grid item xs={12} style={{display:"flex"}}>

           <Grid item xs={5} style={{margin:20}}>
               <Button onClick={()=>{window.location.href=`/edit/${getId}`}} fullWidth variant="outlined" style={{backgroundColor:"blue",color:"white"}}>Edit Image</Button>
           </Grid>
           <Grid item xs={5} style={{margin:20}}>
               <Button onClick={()=>{handleDelete()}} fullWidth variant="outlined" style={{backgroundColor:"blue",color:"white"}}>Delete Image</Button>
           </Grid>
           </Grid>
      </Grid>
    </div>
  )
}

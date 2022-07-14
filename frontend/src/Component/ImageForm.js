import React, { useEffect,useState } from 'react'
import {Grid,Button,TextField} from "@material-ui/core"
import {useHistory} from "react-router-dom"
import { bodyRequest, getRequest } from '../API/server'
import { useContext } from 'react'
import ContextMain from '../Context/MainContext'
export default function ImageForm(props) {
  const history=useHistory()
  const context=useContext(ContextMain)
  const [getId,setId]=useState(null)
  const [getName,setName]=useState("")
  const [getUrl,setUrl]=useState("")
  const [getDetails,setDetails]=useState("")
  if(props.type!=="new" && getId===null){
    let id=String(history.location.pathname).split("/").pop()
    setId(id)
  }
  const getImage=async()=>{
    if(getId){
      context.setOpen(true)
      let res=await getRequest(`/show/${getId}`,"get")
      let image=res.image
      setName(image.image_name)
      setUrl(image.image_url)
      setDetails(image.image_details)
      context.setOpen(false)
    }
  }
  useEffect(()=>{
      getImage()
      // eslint-disable-next-line 
  },[])

  const handleClick=async()=>{
    if(getName===""){
      alert("Name Required")
      return;
    }
    else if(getUrl===""){
      alert("Url Required")
      return;
    }
    else if(getDetails===""){
      alert("Details Required")
      return;
    }
    context.setOpen(true)
    let body={image_name:getName,image_url:getUrl,image_details:getDetails}
    let url=`/`
    let method="post"
    if(getId){
      url=`/edit/${getId}`
      method="put"
    }
    let res=await bodyRequest(url,body,method)
    if(res.status){
      if(getId){
        alert("Image Edit SuccessFully")
      }
      else{
        alert("Image Added SuccessFully")
      }
      context.setOpen(false)
      window.location.href="/"
    }
    else{
      if(res.err){
        alert(res.err)
      }
      else{
        alert("Server Error...")
      }
    }
    context.setOpen(false)
  }

  return (
    <div style={{display:"flex",width:"95%",justifyContent:"center",margin:20,cursor:"default"}}>
      <Grid containor style={{border:"1px solid black",padding:10,width:"50%",borderRadius:20}}>
        <Grid item xs={12} style={{fontSize:30,textAlign:"center",fontStyle:"italic",fontWeight:"600",margin:20}}>
            {props.title}
        </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField fullWidth disabled={getId?true:false} variant="outlined" label="Image Name" value={getName} onChange={(e)=>{setName(e.currentTarget.value)}}/>
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField multiline rows={2}  fullWidth variant="outlined" label="Image URL" value={getUrl} onChange={(e)=>{setUrl(e.currentTarget.value)}}/>
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
                <TextField multiline rows={2}  fullWidth variant="outlined" label="Image Details" value={getDetails} onChange={(e)=>{setDetails(e.currentTarget.value)}}/>
           </Grid>
           <Grid item xs={12} style={{margin:20}}>
               <Button onClick={()=>{handleClick()}} fullWidth variant="outlined" style={{backgroundColor:"blue",color:"white"}}>{props.title}</Button>
           </Grid>
      </Grid>
    </div>
  )
}

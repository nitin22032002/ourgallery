import React,{useContext} from 'react';
import MainContext from "../Context/MainContext"
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
export default function Pagination() {
    const context=useContext(MainContext)
    const handleClick=(val)=>{
      if((val===-1 && context.getCurrentPage!==1) || (val===1 && context.getCurrentPage!==context.getTotal.page)){
        context.api_getImages(null,context.getCurrentPage+val).then(()=>{
        context.setCurrentPage(context.getCurrentPage+val); 
        })
      }
    }
  return (
    <div style={{display:"flex",justifyContent:"flex-end",cursor:"default",margin:20,width:"95%"}}>
        <div style={{fontSize:25,marginBlock:30}}>
          {((context.getCurrentPage-1)*9+1)}-{((context.getCurrentPage-1)*9+context.getImages.length)} of {context.getTotal.count}
        </div>
        <KeyboardArrowLeftIcon  style={{fontSize:100,cursor:context.getCurrentPage===1?"default":"pointer",color:context.getCurrentPage===1?"grey":"black"}} onClick={()=>{handleClick(-1)}}/>
        <div style={{fontSize:25,marginBlock:30}}>
          {context.getCurrentPage} of {context.getTotal.page}
        </div>
        <KeyboardArrowRightIcon onClick={()=>{handleClick(1)}} style={{fontSize:100,cursor:context.getCurrentPage===context.getTotal.page?"default":"pointer",color:context.getCurrentPage===context.getTotal.page?"grey":"black"}}/>
    </div>
  )
}

import React,{ useState} from "react"
import { getRequest} from "../API/server"
import ContextMain from "./MainContext"
export default function ContextValues(props) {
    const [getMenuRender,setMenuRender]=useState("/")
    const [getTotal,setTotal]=  useState({count:0,page:0,per_page:0})
    const [getCurrentPage,setCurrentPage]=useState(1);
    const [open,setOpen]=useState(false)
    const [getImages,setImages]=useState([])
    const [getComponent,setComponent]=useState(<></>)
    const api_getPagination=async()=>{
        try{
            let res=await getRequest("/pagination","get")
            if(res.status){
                setTotal({count:res.total,page:res.pages,per_page:res.per_page})
                return;
            }
            else{
                throw Error("Server Error.....")
            }
        }
        catch(e){
            console.log(e)
            alert("Server Error....")
        }
    }

    const api_getImages=async(id=null,pageno=1)=>{
        try{
            setOpen(true)
            let url=`/?pageno=${pageno}`
            if(id){
                url=`/show/${id}`
            }
            let res=await getRequest(url,"get")
            if(res.status){
                if(id){
                    setImages([res.image])
                }
                else{
                    setImages(res.image)
                }
            }
            else{
                throw Error("Server Error.....")
            }
        }
        catch(e){
            console.log(e)
            alert("Server Error....")
        }
        setOpen(false)
    }

    
  return (
    <ContextMain.Provider value={{open,setOpen,getComponent,setComponent,getCurrentPage,setCurrentPage,getMenuRender,setMenuRender,getImages,setImages,getTotal,api_getImages,api_getPagination}}>
        {props.children}
    </ContextMain.Provider>
  )
}

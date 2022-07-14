import React,{useEffect,useContext} from 'react'
import ContextMain from '../Context/MainContext'
import Images from "./Images"
import Pagination from './Pagination'

export default function Home() {
  const context=useContext(ContextMain)
  useEffect(()=>{
    context.api_getPagination()
    context.api_getImages(null,context.getCurrentPage)
    // eslint-disable-next-line 
},[])
  return (
    <div>
        <Images/>
        <Pagination/>
    </div>
  )
}

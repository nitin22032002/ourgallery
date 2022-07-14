import React,{useContext} from 'react';
import MainContext from "../Context/MainContext"
import ImageCard from './ImageCard';
export default function Images() {
    const context=useContext(MainContext)
    
  return (
    <div style={{display:"flex",flexWrap:"wrap"}}>
        {
            context.getImages.map((item)=>{
                return(
                    <div key={item._id} style={{width:"30%",margin:15,cursor:"pointer"}}>
                        <ImageCard img={item}  />
                    </div>
                )
            })
        }
    </div>
  );
}

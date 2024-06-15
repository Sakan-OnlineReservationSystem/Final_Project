import React from "react";
import image from "./NotFound.svg"
const NotFound = ()=>{
    return (
        <div style={{width:"100%" ,display:"flex" , justifyContent:"center"}}>
            <img style={{width:"25vw"}} src={image} alt="Not found"/>
        </div>
    )
}
export default NotFound;
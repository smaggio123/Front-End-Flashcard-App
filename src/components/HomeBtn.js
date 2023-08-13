import React, { useState } from 'react'
import "./HomeBtn.css";
import { useLocation,useNavigate } from 'react-router-dom';

function HomeBtn () {
    let navigate = useNavigate();

    //Sends user back to learn page
    const toBack = () =>{
        navigate("/home")
    }
    return(
        <>
           <button id="toBackBtn" onClick={()=>toBack()}> <i className="fa-solid fa-house"></i></button>
        </>
    )
}
    export default HomeBtn
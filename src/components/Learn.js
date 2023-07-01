import "./Learn.css";
import { React, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Learn(){
    /*
    1. copy area
    2. fill in the blanks
    2. writing
    3. test
    */
    let navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');
    /*
    const goToCopyArea=()=>{
        //navigate("/books")
    }
    */
    const goToWriting=()=>{
        // navigate(`/home/SetDisplay/learn/written?data=${encodeURIComponent(selectedData)}`)
        navigate(`./written?data=${encodeURIComponent(selectedData)}`)
    }
    return(
        <>
            <h1>Learn</h1>
            {/* <button onClick={()=>goToCopyArea()}>Copy Area</button> */}
            <button>Fill in the Blanks</button>
            <button onClick={()=>goToWriting()}>Writing</button>
            <button>Test</button>
        </>
    )
}
export default Learn
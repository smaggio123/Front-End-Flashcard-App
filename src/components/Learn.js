import "./Learn.css";
import { React } from 'react';
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
    
    const goToCopyArea=()=>{
        navigate(`./copy?data=${encodeURIComponent(selectedData)}`)
    }
    
    const goToWriting=()=>{
        navigate(`./written?data=${encodeURIComponent(selectedData)}`)
    }
    return(
        <>
        <div id="learnContainingDiv">

            <h1 id="learnTitleHeading">Learn</h1>
            <button onClick={()=>goToCopyArea()}>Copy Area</button>
            <button>Fill in the Blanks</button>
            <button onClick={()=>goToWriting()}>Writing</button>
            <button>Test</button>
        </div>
        </>
    )
}
export default Learn
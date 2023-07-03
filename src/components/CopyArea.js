import "./CopyArea.css";
import { React,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function CopyArea(){
    const [hintVisible, setHintVisible] = useState(false);
    const [setList,setSetList]=useState([["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]]);
    const [currentTerm, setCurrentTerm] = useState(setList[0][0]);
    const [currentDef, setCurrentDef] = useState(setList[0][1]);
    const [cardIndex, setCardIndex] = useState(0);

    return(
        <>
        <div id="copyAreaContainingDiv">
            <h1 id="copyAreaTitleHeader">Copy Area</h1>
            <h2 id="copyAreaCurrentTerm">{currentTerm}</h2>
            <div id="copyAreaContainingShownWords">
                <p id="copyAreaShowingDef">{currentDef}</p>
            </div>
            <div id="copyAreaInputArea">
                <textarea id="copyAreaInput"></textarea>
                {/* <input id="copyAreaInput" type="text" placeholder="typing hides definition"></input> */}
            </div>
            <div id="copyAreaDivForCentering">
                <div id="copyAreaButtonArea">
                    <button className="copyAreaButton" id="copyAreaButton1"><i class="fa-solid fa-arrow-left"></i></button>
                    <button className="copyAreaButton"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        </>
    )
}
export default CopyArea
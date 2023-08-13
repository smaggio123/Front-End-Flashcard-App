import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./Written.css";
import { React, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Written(){
    const [hintVisible, setHintVisible] = useState(false);
    const originalList = [["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]];
    const [setList,setSetList]=useState([["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]]);
    const [currentTerm, setCurrentTerm] = useState(setList[0][0]);
    const [currentDef, setCurrentDef] = useState(setList[0][1]);
    const [cardIndex, setCardIndex] = useState(0);
    const [writtenInput,setWrittenInput]=useState("");
    const [settingsActive,setSettingsActive]=useState(false);
    const [writingInputShuffleSet,setwritingInputShuffleSet]=useState(false);
    const [answerWithDefinition,setAnswerWithDefinition] = useState(true);
    let navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');

    // Fisher-Yates shuffle algorithm
    //Shuffles the list of terms and definitions
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    //Handles shuffling the set
    const handleShuffle=()=>{
        setwritingInputShuffleSet(!writingInputShuffleSet);
        if (!writingInputShuffleSet) {
            setSetList(shuffleArray([...setList]));
        } else {
            setSetList(originalList);
        }
    }

    //Handles the hint button being clicked
    const handleHintBtn = () =>{
        let l = hintVisible;
        setHintVisible(!l)
    }
    //Sends user back to learn page
    const handleBackTolearn = () =>{
        const { pathname } = location;
        const newUrl = `${pathname.substring(0, pathname.lastIndexOf('/'))}?data=${encodeURIComponent(selectedData)}`;
        navigate(newUrl)
    }
    //Brings up the settings page
    const handlesettingsClicked = () =>{
        setSettingsActive(!settingsActive);
    }
    /*
    const handleUpdateBtn = () =>{
            //if(writingInputAnsWithDef)alert()
            // if(writingInputShuffleSet)
        setSettingsActive(!settingsActive);
    }
    */
   //Checks if the user got the term/def correct
    const handleSubmit = () =>{
        setHintVisible(false);
        if(answerWithDefinition){
            if(writtenInput===currentDef)alert("Correct")
            else alert("Incorrect. answer was: "+currentDef)
        }
        else{
            if(writtenInput===currentTerm)alert("Correct")
            else alert("Incorrect. Correct answer was: "+currentTerm)
        }

        let c = cardIndex;
        c=c+1;
        c%=setList.length;
        setCardIndex(c)
        setCurrentTerm(setList[c][0])
        setCurrentDef(setList[c][1])
        setWrittenInput("");
    }
    //Allows the user to move on without guessing the term/def
    const handleIDKBro = () =>{
        setHintVisible(false);
        if(answerWithDefinition)alert("The answer is: "+ currentDef)
        else alert("The answer is: "+ currentTerm)
        let c = cardIndex;
        c=c+1;
        c%=setList.length;
        setCardIndex(c)
        setCurrentTerm(setList[c][0])
        setCurrentDef(setList[c][1])
        setWrittenInput("");
    }
    return(
        <>
        <button id="back-button" style={{color: settingsActive ? 'white' : 'black'}} onClick={()=>handleBackTolearn()}>Learn</button>
        <button id="settings-btn" style={{color: settingsActive ? 'white' : 'black'}} onClick={()=>handlesettingsClicked()}><i className="fa-solid fa-gear fa-3x"></i></button>
        {settingsActive?
            <div id="writtenSettings">
            <h1 id="writtenSettingsHeader">Settings</h1>
            <div id="writtenSettingsContainer">
                <div id="writtenSettingsContents">
                    {/* 
                        Options:
                        -Swapping terms with definitions
                        -shuffle terms

                    */}
                    <div className="writtenSettingAttributes">
                        <h3 id="writtenSettingAnswerDefs">Answer with definitions</h3>
                        <input type="checkbox" checked={answerWithDefinition} onChange={(e)=>setAnswerWithDefinition(!answerWithDefinition)}/>
                    </div>
                    <div className="writtenSettingAttributes">
                        <h3 id="writtenSettingShuffle">Shuffle set</h3>
                        <input type="checkbox" checked={writingInputShuffleSet} onChange={()=>handleShuffle()}/>
                    </div>
                        {/* <button id="writtenUpdateBtn" onClick={()=>handleUpdateBtn()}>Update</button> */}
                    </div>
                </div>
            </div>
            :
            <div id="writtenCenteringDiv">

                <h1 id="writtenHeading">Written</h1>
                <h2 id="writtenShownWord">{answerWithDefinition?currentTerm:currentDef}</h2>
                <div id="writtenHintDiv">
                    <h2 id={hintVisible?"writtenHintShown":"writtenHintHidden"}>{answerWithDefinition?currentDef:currentTerm}</h2>
                
                    <button id="writtenHintButton" onClick={()=>handleHintBtn()}>Hint</button>
                </div>
                <div>
                    <input id="writtenInput" type="text" value={writtenInput} onChange={(e)=>setWrittenInput(e.target.value)}/>
                </div>

                <div id="writtenBtnDiv">
                    <button id="writtenIDKButton" onClick={()=>handleIDKBro()}>Idk Bro</button>
                    <button id="writtenSubmitButton" onClick={()=>handleSubmit()}>Submit</button>
                </div>
            </div>
            }
        </>
    )
}
export default Written
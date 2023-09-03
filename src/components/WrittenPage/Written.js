import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./Written.css";
import { React, useState} from 'react';
import LearnBtn from '../LearnBtn';
import TitleHeader from '../TitleHeader';

/*
    ["Diffusion","The passive movement of particles from an area of high concentration to low concentration. This happens along a concentration gradient"],
    ["Osmosis","A passive movement of water molecules through a semi permeable membrane. Water moves from an area of low solute concentration to high solute concentration"],
    ["Active Transport","An active movement where an input of energy is required. Particles move from low concentration to high concentration"],
    ["Facilitated Diffusion","A passive movement of particles from high to low concentration through a protein channel in a cell."],
    ["Isotonic Solution","The same concentration of dissolved substances. Water in = water out."],
    ["Hypertonic Solution","Higher concentration of solutes outside cell than inside"],
    ["Plasmolyse","When a cell has shrunk"],
    ["Hypotonic Solution","A cell has more solute inside than outside."],
    ["Turgid","Cell may explode under pressure due to a hypotonic solution."],
    ["Exocytosis","Movement out of a cell"],
    ["Endocytosis","Movement into a cell"],

    ["The passive movement of particles from an area of high concentration to low concentration. This happens along a concentration gradient",0],
    ["A passive movement of water molecules through a semi permeable membrane. Water moves from an area of low solute concentration to high solute concentration",1],
    ["An active movement where an input of energy is required. Particles move from low concentration to high concentration",2],
    ["A passive movement of particles from high to low concentration through a protein channel in a cell.",3],
    ["The same concentration of dissolved substances. Water in = water out.",4],
    ["Higher concentration of solutes outside cell than inside",5],
    ["When a cell has shrunk",6],
    ["A cell has more solute inside than outside.",7],
    ["Cell may explode under pressure due to a hypotonic solution.",8],
    ["Movement out of a cell",9],
    ["Movement into a cell",10],
*/

function Written(){
    const [hintVisible, setHintVisible] = useState(false);
    const originalList = [
        //[["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]];
        ["Diffusion","The passive movement of particles from an area of high concentration to low concentration. This happens along a concentration gradient"],
        ["Osmosis","A passive movement of water molecules through a semi permeable membrane. Water moves from an area of low solute concentration to high solute concentration"],
        ["Active Transport","An active movement where an input of energy is required. Particles move from low concentration to high concentration"],
        ["Facilitated Diffusion","A passive movement of particles from high to low concentration through a protein channel in a cell."],
        ["Isotonic Solution","The same concentration of dissolved substances. Water in = water out."],
    ["Hypertonic Solution","Higher concentration of solutes outside cell than inside"],
    ["Plasmolyse","When a cell has shrunk"],
    ["Hypotonic Solution","A cell has more solute inside than outside."],
    ["Turgid","Cell may explode under pressure due to a hypotonic solution."],
    ["Exocytosis","Movement out of a cell"],
    ["Endocytosis","Movement into a cell"],
    ]
    const [setList,setSetList]=useState([
        //[["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]]
        ["Diffusion","The passive movement of particles from an area of high concentration to low concentration. This happens along a concentration gradient"],
        ["Osmosis","A passive movement of water molecules through a semi permeable membrane. Water moves from an area of low solute concentration to high solute concentration"],
        ["Active Transport","An active movement where an input of energy is required. Particles move from low concentration to high concentration"],
        ["Facilitated Diffusion","A passive movement of particles from high to low concentration through a protein channel in a cell."],
        ["Isotonic Solution","The same concentration of dissolved substances. Water in = water out."],
        ["Hypertonic Solution","Higher concentration of solutes outside cell than inside"],
        ["Plasmolyse","When a cell has shrunk"],
        ["Hypotonic Solution","A cell has more solute inside than outside."],
        ["Turgid","Cell may explode under pressure due to a hypotonic solution."],
        ["Exocytosis","Movement out of a cell"],
        ["Endocytosis","Movement into a cell"],
        ]);
    const [currentTerm, setCurrentTerm] = useState(setList[0][0]);
    const [currentDef, setCurrentDef] = useState(setList[0][1]);
    const [cardIndex, setCardIndex] = useState(0);
    const [writtenInput,setWrittenInput]=useState("");
    const [settingsActive,setSettingsActive]=useState(false);
    const [writingInputShuffleSet,setwritingInputShuffleSet]=useState(false);
    const [answerWithDefinition,setAnswerWithDefinition] = useState(true);
    const [hintWord,setHintWord] = useState(currentDef.split(" ").slice(0, 3).join(' '))
    
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
        setHintVisible((prevState) => !prevState);
    }
    //Brings up the settings page
    const handlesettingsClicked = () =>{
        setSettingsActive(!settingsActive);
    }
    
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

const handleAnswerWithSettingsChanged=()=>{
    setAnswerWithDefinition((prevState) =>{
        setHintWord(!prevState?currentDef.split(" ").slice(0, 3):currentTerm.split(" ").slice(0, 3).join(' '))
        return !prevState
    } );
}
return(
    <>
        <LearnBtn/>
        <button id="settings-btn" onClick={()=>handlesettingsClicked()}><i className="fa-solid fa-gear fa-3x"></i></button>
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
                            <input type="checkbox" checked={answerWithDefinition} onChange={()=>handleAnswerWithSettingsChanged()}/>
                        </div>
                        <div className="writtenSettingAttributes">
                            <h3 id="writtenSettingShuffle">Shuffle set</h3>
                            <input type="checkbox" checked={writingInputShuffleSet} onChange={()=>handleShuffle()}/>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div id="writtenCenteringDiv">
                <TitleHeader title={"Written"}/>
                <h2 id="writtenShownWord">{answerWithDefinition?currentTerm:currentDef}</h2>
                <div id="writtenHintDiv">
                    <h2 id="WrittenHint" style={hintVisible?{visibility:"visible"}:{visibility:"hidden"}}>{hintWord}</h2>
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
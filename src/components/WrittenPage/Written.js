import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./Written.css";
import { React, useState} from 'react';
import LearnBtn from '../LearnBtn';
import TitleHeader from '../TitleHeader';


function Written(){
    const [hintVisible, setHintVisible] = useState(false);
    const [showRealWord,setShowRealWord] = useState(false);
    const [correctWord,setCorrectWord] = useState("");
    const originalList = [
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
            if(writtenInput===currentDef){
                alert("Correct")
                nextPair()
            }
            else {
                setHintVisible(false);
                setShowRealWord(true);
                setCorrectWord(currentDef)
                
            }
    }
    else{
        if(writtenInput===currentTerm){
            alert("Correct")
            nextPair()
        }
            else {
                setHintVisible(false);
                setShowRealWord(true);
                setCorrectWord(currentTerm)
            }
    }
}
//Allows the user to move on without guessing the term/def
const handleIDKBro = () =>{
    setHintVisible(false);
    setShowRealWord(true);
    if(answerWithDefinition) setCorrectWord(currentDef)
    else setCorrectWord(currentTerm)
}
const nextPair=()=>{
    setHintVisible(false);
    let c = cardIndex;
    c=c+1;
    c%=setList.length;
    setCardIndex(c)
    setCurrentTerm(setList[c][0])
    setCurrentDef(setList[c][1])
    setWrittenInput("");
    setHintWord(handleSettingHintWord(answerWithDefinition,c))
    setShowRealWord(false)
}

const handleAnswerWithSettingsChanged=()=>{
    setAnswerWithDefinition((prevState) =>{
        setHintWord(handleSettingHintWord(!prevState,undefined))
        return !prevState
    } );
}

const handleSettingHintWord=(awd=answerWithDefinition,tempIndex=cardIndex)=>{
    let tempWord = ''
    if(awd) tempWord = setList[tempIndex][1]
    else tempWord = setList[tempIndex][0]
    //If the word count is 3 or less, hint is a fourth of the original word
    if(tempWord.split(" ").length<=3) return tempWord.slice(0,tempWord.length/4)
    //If word count is greater than 3, display the first 3 words
    else return tempWord.split(" ").slice(0, 3).join(' ')
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
                {!showRealWord?
                <div id="writtenHintDiv">
                    <h2 id="WrittenHint" style={hintVisible?{visibility:"visible"}:{visibility:"hidden"}}>{hintWord}</h2>
                    <button id="writtenHintButton" onClick={()=>handleHintBtn()}>Hint</button>
                </div>
                :
                <></>
                }
                <div id='WrittenCorrectWordContainer'>
                    <p id='WrittenCorrectDefinition'>{showRealWord?correctWord:""}</p>
                </div>
                <div>
                    <input id="writtenInput" type="text" value={writtenInput} onChange={(e)=>{
                        setWrittenInput(e.target.value)
                        if(showRealWord&&e.target.value===correctWord){
                            nextPair()
                        }
                    }
                    }/>
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
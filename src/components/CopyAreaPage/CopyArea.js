import LearnBtn from "../LearnBtn";
import "./CopyArea.css";
import { React,useState, useRef, useEffect } from 'react';

function CopyArea(){
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
    const setList=[
        ["word1","def1"],
        ["Diffusion","The passive movement of particles from an area of high concentration to low concentration"],
        ["Osmosis","A passive movement of water molecules through a semi permeable membrane"],
        ["Active Transport","An active movement where an input of energy is required"],
        ["word5","def5"]
    ]
    const [currentTerm, setCurrentTerm] = useState(setList[0][0]);
    const [currentDef, setCurrentDef] = useState(setList[0][1]);
    const [cardIndex, setCardIndex] = useState(0);
    const [showDefinition,setShowDefinition] = useState(true);
    const [writtenInput, setWrittenInput] = useState("");
    const [copyAreaBorderColorWhite, setCopyAreaBorderColorWhite] = useState(true);
    const [resetTime,setResetTime]=useState(3);
    const [totalTime, setTotalTime] = useState(0);
    const [operation,setOperation] = useState(-1);
    const [canType, setCanType] = useState(true);
    const listOfOperations = {
	nothing: -1,
    hideWord: 0,
	showWord: 1,
    goRight: 2,
    }

    useEffect(() => {
        if (Ref.current) clearInterval(Ref.current);
        let id = null;
        if(totalTime > 0)id = setTimeout(() => setTotalTime(totalTime - 1),1000)
        else{
            switch(operation){
                case listOfOperations.nothing:
                    break;
                case listOfOperations.hideWord:
                    //Hide word
                    setShowDefinition(false)
                    break;
                case listOfOperations.showWord:
                    //Show word
                    setShowDefinition(true)
                    break;
                case listOfOperations.goRight:
                    //Go right
                    handleRightBtnClick();
                    break;
                default:
                    //Don't do anything
                    break;

            }
        }
        Ref.current = id;
    }, [totalTime]);

    //Allows the user to move on without guessing the term/def
    const handleRightBtnClick = () =>{
        let c = cardIndex;
        c=c+1;
        c%=setList.length;
        setCardIndex(c)
        setCurrentTerm(setList[c][0])
        setCurrentDef(setList[c][1])
        setWrittenInput("");
        setCopyAreaBorderColorWhite(true)
        setCanType(true)
    }
    const handleLeftBtnClick = () =>{
        let c = cardIndex;
        if(c===0){
            c=setList.length-1;
        }
        else{
            c-=1;
        }
        setCardIndex(c)
        setCurrentTerm(setList[c][0])
        setCurrentDef(setList[c][1])
        setWrittenInput("");
        setCopyAreaBorderColorWhite(true)
        setCanType(true)
    }
     const copyAreaHandleTextInput = (val) => {
        if(canType){
            setWrittenInput(val)
            setOperation(listOfOperations.showWord)
            setShowDefinition(false)
            if(val === ""){
                setShowDefinition(true)
                setTotalTime(0)
            }
            else{
                setTotalTime(resetTime)
            }
            if(val.toLowerCase()===currentDef.toLowerCase()){
                setCanType(false)
                setCopyAreaBorderColorWhite(false)
                setShowDefinition(true)
                setOperation(listOfOperations.goRight)
                setTotalTime(3)
            }
            
        }
        }
        
    return(
        <>
        <LearnBtn/>
        <div id="CopyAreaTimerContainer">
                <div id="CopyAreaTimerContainingDiv">
                    <h2 id="CopyAreaTimerDisplayedTime">{totalTime}</h2>
                </div>
            </div>
        <div id="copyAreaContainingDiv">
            <h1 id="copyAreaTitleHeader">Copy Area</h1>
            <h2 id="copyAreaCurrentTerm">{currentTerm}</h2>
            <div id="copyAreaContainingShownWords" style={{border: copyAreaBorderColorWhite? "1px solid white": "1px solid green"}}>
                <p id="copyAreaShowingDef" style={{visibility: showDefinition? "visible":"hidden"}}>{currentDef}</p>
            </div>
            <div id="copyAreaInputArea">
                <textarea id="copyAreaInput" value={writtenInput} onChange={(e)=>copyAreaHandleTextInput(e.target.value)}></textarea>
            </div>
            <div id="copyAreaDivForCentering">
                <div id="copyAreaButtonArea">
                    <button className="copyAreaButton" id="copyAreaButton1" onClick={()=>handleLeftBtnClick()}><i className="fa-solid fa-arrow-left"></i></button>
                    <button className="copyAreaButton" onClick={()=>handleRightBtnClick()}><i className="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        </div>
        </>
    )
}
export default CopyArea
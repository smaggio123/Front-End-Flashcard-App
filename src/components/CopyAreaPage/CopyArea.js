import LearnBtn from "../LearnBtn";
import "./CopyArea.css";
import { React,useState, useEffect } from 'react';

function CopyArea(){
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
    const [timer, setTimer] = useState(5);
    
    useEffect(() => {
        if(writtenInput===currentDef){
            setShowDefinition(true);
            setCopyAreaBorderColorWhite(false);
            setTimer(3);
            const interval = setInterval(() => {
                setTimer((prevTimer)=> {
                    if (prevTimer === 0) {
                        setShowDefinition(true);
                        clearInterval(interval);
                        return 5;
                    }
                    return prevTimer - 1;
                    });
                }, 1000);
        }
        else if(writtenInput !== ''){
            setShowDefinition(false);
            const interval = setInterval(() => {
            setTimer((prevTimer)=> {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    setShowDefinition(true);
                    return 5;
                }
                return prevTimer - 1;
                });
            }, 1000);
        
            // Clean up the interval when the component unmounts
            return () => clearInterval(interval);
        }
      }, [writtenInput]);

    //Allows the user to move on without guessing the term/def
    const handleRightBtnClick = () =>{
        let c = cardIndex;
        c=c+1;
        c%=setList.length;
        setCardIndex(c)
        setCurrentTerm(setList[c][0])
        setCurrentDef(setList[c][1])
        setWrittenInput("");
        setTimer(5);
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
        setTimer(5);
    }
    const copyAreaHandleTextInput = (val) =>{
        setWrittenInput(val)
        if(val===currentDef){
            setTimeout(() => {
                setCopyAreaBorderColorWhite(true)
                handleRightBtnClick();
              }, 3000); // Wait for 3 seconds
            
        }
        setShowDefinition(false)
    }

    return(
        <>
        <LearnBtn/>
        <div id="copyAreaContainingDiv">
            <h1 id="copyAreaTitleHeader">Copy Area</h1>
            <h2 id="copyAreaCurrentTerm">{currentTerm}</h2>
            <div id="copyAreaContainingShownWords" style={{border: copyAreaBorderColorWhite? "1px solid white": "1px solid green"}}>
                <p id="copyAreaShowingDef" style={{visibility: showDefinition? "visible":"hidden"}}>{currentDef}</p>
                <div id="copyAreaTimerArea"><h2 id="copyAreaTimer">{timer}</h2></div>
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
import LearnBtn from "../LearnBtn";
import TitleHeader from "../TitleHeader";
import "./CopyArea.css";
import MySet from '../ObjectClasses/Set'
import { React,useState, useRef, useEffect } from 'react';
import CopyAreaSettingsPage from "./CopyAreaSettingsPage";
import MyPair from "../ObjectClasses/Pair";
import ListOfPairs from "./ListOfPairs";

function CopyArea(){
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
    const [myList,setMyList] = useState(new ListOfPairs(new MySet([
            new MyPair(0,-1,"word1","def1"),
            new MyPair(1,-1,"Diffusion","The passive movement of particles from an area of high concentration to low concentration"),
            new MyPair(2,-1,"Osmosis","A passive movement of water molecules through a semi permeable membrane"),
            new MyPair(3,-1,"Active Transport","An active movement where an input of energy is required"),
            new MyPair(4,-1,"word5","def5")
        ],null,null,null))
    )
    const [showDefinition,setShowDefinition] = useState(true);
    const [writtenInput, setWrittenInput] = useState("");
    const [copyAreaBorderColorWhite, setCopyAreaBorderColorWhite] = useState(true);
    const [resetTime,setResetTime]=useState(3);
    const [totalTime, setTotalTime] = useState(0);
    const [operation,setOperation] = useState(-1);
    const [canType, setCanType] = useState(true);
    const [settingsShowing,setSettingsShowing] = useState(false);
    const [settingOptionCaseSensitive,setSettingOptionCaseSensitive] = useState(true);
    const [settingOptionAnswerWithDef,setSettingOptionAnswerWithDef] = useState(true);
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
                    handleRightBtnClick(true);
                    break;
                default:
                    //Don't do anything
                    break;

            }
        }
        Ref.current = id;
    }, [totalTime]);

    //Allows the user to move on without guessing the term/def
    const handleRightBtnClick = (ignoreBorderColor=false) =>{
        if(ignoreBorderColor||copyAreaBorderColorWhite){
            const newSet = new ListOfPairs(myList.getSet());
            newSet.setCurrentIndex((myList.getCurrentIndex()+1)%myList.getListLength())
            setMyList(newSet);
            setWrittenInput("");
            setCopyAreaBorderColorWhite(true)
            setCanType(true)
        }
    }
    const handleLeftBtnClick = () =>{
        if(copyAreaBorderColorWhite){
            const newSet = new ListOfPairs(myList.getSet());
            if(myList.getCurrentIndex()===0){
                newSet.setCurrentIndex(myList.getListLength()-1)
            }
            else{
                newSet.setCurrentIndex((myList.getCurrentIndex()-1))
            }
            setMyList(newSet);
            setWrittenInput("");
            setCopyAreaBorderColorWhite(true)
            setCanType(true)
        }
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
            let inputToCompare = val;
            let answer=settingOptionAnswerWithDef?myList.getCurrentDef():myList.getCurrentTerm();
            if(!settingOptionCaseSensitive){
                inputToCompare = inputToCompare.toLowerCase()
                answer = answer.toLowerCase()
            }
            if(inputToCompare===answer){
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
        <button id="settings-btn" onClick={()=>setSettingsShowing(!settingsShowing)}><i className="fa-solid fa-gear fa-3x"></i></button>
        <TitleHeader title={"Copy Area"}/>
        {settingsShowing?
        <>
            <CopyAreaSettingsPage settingOptionCaseSensitive={settingOptionCaseSensitive} setSettingOptionCaseSensitive={setSettingOptionCaseSensitive} settingOptionAnswerWithDef={settingOptionAnswerWithDef} setSettingOptionAnswerWithDef={setSettingOptionAnswerWithDef} resetTime={resetTime} setResetTime={setResetTime} settingsShowing={settingsShowing} setSettingsShowing={setSettingsShowing}/>
        </>
            :
        <>
            <div id="CopyAreaTimerContainer">
                    <div id="CopyAreaTimerContainingDiv">
                        <h2 id="CopyAreaTimerDisplayedTime">{totalTime}</h2>
                    </div>
                </div>
            <div id="copyAreaContainingDiv">
                <h2 id="copyAreaCurrentTerm">{settingOptionAnswerWithDef?myList.getCurrentTerm():myList.getCurrentDef()}</h2>
                <div id="copyAreaContainingShownWords" style={{border: copyAreaBorderColorWhite? "1px solid white": "1px solid green"}}>
                    <p id="copyAreaShowingDef" style={{visibility: showDefinition? "visible":"hidden"}}>{settingOptionAnswerWithDef?myList.getCurrentDef():myList.getCurrentTerm()}</p>
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
        }
    </>
    )
}
export default CopyArea
import "./MatchingSettingsPage.css";
import { React,useState } from 'react';

function MatchingSettingsPage(props){
    const {fullReset,isSettingsShowing,setIsSettingsShowing,nextStepSize,setNextStepSize,numberOfPairs,setNumberOfPairs} = props;
    const [numPairsInput,setNumPairsInput] = useState(numberOfPairs)
    const [numNewTermsInput,setNumNewTermsInput] = useState(nextStepSize)
    const [isWarningMessageShow,setIsWarningMessageShow] = useState(false)
    const [warningMessage,setWarningMessage] = useState("")
    const minPairs = 3;
    const maxPairs = 10;
    const minSteps = 1;
    
    const handleApplyClicked=(nPairsI,nNewTermsI)=>{
        //nPairsI and nNewTermsI are strings
        let [num1,num2] = [parseInt(nPairsI),parseInt(nNewTermsI)]
        //No point in jumping passed the total number of pairs matched. If there are 10 pairs, why skip 12 when 10 will skip passed all of them
        if((num1>=num2)&&(((num1>=3)&&(num1<=10))&&((num2>=1)&&(num2<=num1)))){
            setNumberOfPairs(num1);
            setNextStepSize(num2);
            setIsSettingsShowing(!isSettingsShowing)
            fullReset(num1,num2)
        }
        else{
            setIsWarningMessageShow(true);
            if(!(num1>=3&&num1<=10)){
                setWarningMessage("Check bounds on # of pairs: ("+minPairs+" < [# pairs] < "+maxPairs+")")
            }
            else if(!(num2>=1&&num2<=num1)){
                setWarningMessage("Check bounds on # new terms: ("+minSteps+" < [# terms] < # of Pairs)")
            }
            else if(!(num1>=num2)){
                setWarningMessage("Make sure: # of pairs >= # new terms")
            }
            else{
                setWarningMessage("Problem")
            }
        }
    }

    return(
        <>
            <div id="MatchingSettings">
                <div id="MatchingSettingsContainer">
                    <h2 id="MatchingSettingsHeader">Settings</h2>
                    <div id="MatchingSettingsContents">
                        {/* 
                        Options:
                        -next step size
                        -number of pairs
                        -Re-shuffle

                        */}
                        <div className="MatchingSettingAttributes">
                            <h3 id="MatchingSettingAnswerDefs"># of Pairs</h3>
                            <input type="number" className="MatchingSettingsNumberInput" min={3} max={10} value={numPairsInput} onChange={(event) =>{
                                setNumPairsInput(event.target.value)
                                setNumNewTermsInput(event.target.value)
                            }
                        }></input> 
                        </div>
                        <div className="MatchingSettingAttributes">
                            <h3 id="MatchingSettingAnswerDefs">Step size on Completion</h3>
                            <input type="number" className="MatchingSettingsNumberInput" min={1} max={numPairsInput} value={numNewTermsInput} 
                            onChange={(event) => setNumNewTermsInput(event.target.value)}></input> 
                        </div>
                        {/* <div className="MatchingSettingAttributes">
                            <h3 id="MatchingSettingAnswerDefs">Re-shuffle</h3>
                            <input type="checkbox" checked={doShuffleInput} onChange={(e)=>setDoShuffleInput(!doShuffleInput)}/>
                        </div> */}
                    </div>
                    {isWarningMessageShow?
                    <h3 id="MatchingSettingsWarningMessage">{warningMessage}</h3>
                    :
                    <>
                    </>
                    }
                    <button id="MatchingSettingsResetBtn" onClick={()=>handleApplyClicked(numPairsInput,numNewTermsInput)}>Apply</button>
                </div>
            </div>
        </>
    )
}
export default MatchingSettingsPage;
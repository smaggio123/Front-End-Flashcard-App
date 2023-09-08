import "./CopyAreaSettingsPage.css";
import { React,useState} from 'react';

function CopyAreaSettingsPage(props){
    const {settingOptionCaseSensitive,setSettingOptionCaseSensitive,settingOptionAnswerWithDef,setSettingOptionAnswerWithDef,resetTime,setResetTime,settingsShowing,setSettingsShowing} = props;
    const [settingOptionSettingCaseSensitive,setSettingOptionSettingCaseSensitive] = useState(settingOptionCaseSensitive);
    const [settingOptionSettingAnswerWithDef,setSettingOptionSettingAnswerWithDef] = useState(settingOptionAnswerWithDef);
    const [settingResetTime,setSettingResetTime]=useState(resetTime);
    const [isWarningMessageShow,setIsWarningMessageShow] = useState(false)

    const handleApply = () => {
        if(settingResetTime>=1&&settingResetTime<=10){
            setSettingOptionCaseSensitive(settingOptionSettingCaseSensitive)
            setSettingOptionAnswerWithDef(settingOptionSettingAnswerWithDef)
            setResetTime(settingResetTime)
            setSettingsShowing(!settingsShowing)
        }
        else{
            setIsWarningMessageShow(true)
        }
    }

    return(
    <>
        <div id="CopyAreaSettingsPageBorder">
            <div id="CopyAreaSettingsPageContainer">
                <h2 id="CopyAreaSettingsPageHeader">Settings</h2>
                <div id="CopyAreaSettingsPageContents">
                    {/* 
                        Options:
                        - Case sensitive
                        - Answer with term
                        - timer adjustment

                    */}
                    <div className="CopyAreaSettingsPageSettingAttributes">
                        <h3 id="CopyAreaSettingsPageCaseSensitive">Case sensitive</h3>
                        <input type="checkbox" checked={settingOptionSettingCaseSensitive} onChange={()=>setSettingOptionSettingCaseSensitive(!settingOptionSettingCaseSensitive)}/>
                    </div>
                    <div className="CopyAreaSettingsPageSettingAttributes">
                        <h3 id="CopyAreaSettingsPageShuffleSet">Answer with definition</h3>
                        <input type="checkbox" checked={settingOptionSettingAnswerWithDef} onChange={()=>setSettingOptionSettingAnswerWithDef(!settingOptionSettingAnswerWithDef)}/>
                    </div>
                    <div className="CopyAreaSettingsPageSettingAttributes">
                            <h3 id="CopyAreaSettingsPageTimerTime">Timer time</h3>
                            <input type="number" className="CopyAreaSettingsPageNumberInput" min={1} max={10} value={settingResetTime} 
                            onChange={(event) => setSettingResetTime(event.target.value)}></input> 
                        </div>
                </div>
                {isWarningMessageShow?
                    <h3 id="CopyAreaSettingsPageWarningMessage">{"Keep timer time between 1 and 10 (inclusive)"}</h3>
                    :
                    <>
                    </>
                }
                <button id="CopyAreaSettingsPageApplyBtn" onClick={()=>handleApply()}>Apply</button>
            </div>
        </div>
    </>
    )
}
export default CopyAreaSettingsPage
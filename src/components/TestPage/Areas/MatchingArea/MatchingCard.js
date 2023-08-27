import React, { useState } from 'react'
import "./MatchingCard.css";
import IndexHeader from '../../GeneralComponents/IndexHeader';

function MatchingCard (props) {
    const {termList,defList,listOfInputAnswers,setListOfInputAnswers,index,totalPairs} = props;

    const handleChangeToSelection=(i,val)=>{
        let tempArr = listOfInputAnswers
        if(val===""){
            tempArr[i+index]=null
        }
        else{
            tempArr[i+index]=(val==='true')
        }
        setListOfInputAnswers(tempArr)
    }

    return(
        <>
        <div id='MatchingCardContainer'>
            <IndexHeader index={index+" - "+totalPairs}/>
            <div id='MatchingCardFlexedContainer'>
                <div id='MatchingCardLeftSide'>
                    {termList.map((item,miniCardIndex)=>(
                        <div key={miniCardIndex} id='MatchingCardMiniCard'>
                            <select id={"MatchingCardSelection"+miniCardIndex} className="MatchingCardSelection" onChange={(e)=>handleChangeToSelection(miniCardIndex,e.target.value)}>
                            <option key={"null"} value={null}>{null}</option>
                                {defList.map((i,optionIndex)=>(
                                    <option key={optionIndex} value={parseInt(termList[miniCardIndex][1]) === parseInt(defList[optionIndex][1])}>{String.fromCharCode(65+optionIndex)}</option>
                                ))}
                            </select>
                            <p id='MatchingCardTermDisplay'>{item[0]}</p>
                        </div>
                    ))}
                </div>
                <div id='MatchingCardRightSide'>
                    {defList.map((item,index)=>(
                        <div key={index} id='MatchingCardMiniCard'>
                            <p id='MatchingCardTermDisplay'>{String.fromCharCode(65+index)+". "+item[0]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
export default MatchingCard
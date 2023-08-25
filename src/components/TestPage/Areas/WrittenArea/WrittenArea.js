import React, { useState } from 'react'
import "./WrittenArea.css";
import WrittenCard from './WrittenCard';

function WrittenArea (props) {
    const {writtenAreaList,shuffledList,listOfInputAnswers, setListOfInputAnswers,startIndex,numberOfPairs} = props;
    return(
        <>
            {writtenAreaList.map((item,pairListIndex)=>(
                <div key={pairListIndex} id='TrueFalseAreaFullWidth'>
                    <div id='TrueFalseAreaContainer'>
                        <WrittenCard term={writtenAreaList[pairListIndex][0]} definition={writtenAreaList[pairListIndex][1]} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers} index={pairListIndex+startIndex} numberOfPairs={numberOfPairs}/>
                    </div>
                </div>
            ))}
        </>
    )
}
export default WrittenArea
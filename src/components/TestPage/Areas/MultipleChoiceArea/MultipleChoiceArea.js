import React, { useState } from 'react'
import "./MultipleChoiceArea.css";
import MultipleChoiceCard from './MultipleChoiceCard';

function MultipleChoiceArea (props) {
    const {multipleChoiceList,shuffledList,listOfInputAnswers,setListOfInputAnswers,startIndex} = props

    return(
        <>
            {multipleChoiceList.map((item,listIndex)=>(
                <div key={listIndex} id='MultipleChoiceAreaFullWidth'>
                    <div id='MultipleChoiceAreaContainer'>
                        <MultipleChoiceCard multipleChoiceList={multipleChoiceList} shuffledList={shuffledList.filter((e)=>e!=item)} index={listIndex} startIndex={startIndex} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers}/>
                    </div>
                </div>
            ))}
        </>
    )
}
export default MultipleChoiceArea
import React, { useState } from 'react'
import "./WrittenCard.css";
import IndexHeader from '../../GeneralComponents/IndexHeader';

function WrittenCard (props) {
    const {term,definition,listOfInputAnswers, setListOfInputAnswers, index,numberOfPairs} = props
    return(
        <>
        <div id='WrittenChoiceCardContainer'>
                <IndexHeader index={index+1}/>
                <div id='WrittenChoiceCardTopArea'>
                    <p id='WrittenChoiceCardTermDefHeader'>Definition</p>
                    <p id='WrittenChoiceCardDefDisplay'>{definition}</p>
                </div>
                <div>
                    <p id='WrittenCardMessage'>Your answer</p>
                </div>
                <div id='WrittenChoiceInputContainer'>
                    <input type='text' id='WrittenChoiceInput' placeholder='Type answer' onChange={(e)=>{
                        let tempList = listOfInputAnswers
                        if(e.target.value==='') tempList[index]=null
                        else tempList[index]=e.target.value===term
                        setListOfInputAnswers(tempList)
                    }}/>
                </div>
            </div>
        </>
    )
}
export default WrittenCard
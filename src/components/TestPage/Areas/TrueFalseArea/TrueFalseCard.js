import React, { useState } from 'react'
import "./TrueFalseCard.css";

function TrueFalseCard (props) {
    const {term,definition,index,listOfInputAnswers, setListOfInputAnswers} = props
    const [trueClicked,setTrueClicked] = useState(false)
    const [falseClicked,setfalseClicked] = useState(false)
    const handleTrueClicked=()=>{
        if(trueClicked){
            setTrueClicked(null);
            let tempArr = listOfInputAnswers
            tempArr[index] = null
            setListOfInputAnswers(tempArr)
        }
        else{
            setTrueClicked(!trueClicked);
            let tempArr = listOfInputAnswers
            tempArr[index] = true
            setListOfInputAnswers(tempArr)
        }
        setfalseClicked(false);
    }
    const handleFalseClicked=()=>{
        if(falseClicked){
            setfalseClicked(null);
            let tempArr = listOfInputAnswers
            tempArr[index] = null
            setListOfInputAnswers(tempArr)
        }
        else{
            setfalseClicked(!falseClicked);
            let tempArr = listOfInputAnswers
            tempArr[index] = false
            setListOfInputAnswers(tempArr)
        }
        setTrueClicked(false)
    }
    return(
        <>
        <div id='TrueFalseCardContainer'>
            <div id='TrueFalseCardIndexLabel'>
                <p>{index+1}</p>
            </div>
            <hr id='TrueFalseCardDivider'/>

            <div id='TrueFalseCardDisplayWords'>
                <div id='TrueFalseCardLeftSide'>
                    <div className='TrueFalseCardTermDefHeader'>Term</div>
                    <div  className='TrueFalseCardWordDisplayed'>
                        {term}
                    </div>
                </div>
                <div id='TrueFalseCardRightSide'>
                    <div className='TrueFalseCardTermDefHeader'>Definition</div>
                    <div id='TrueFalseCardDefDisplay' className='TrueFalseCardWordDisplayed'>
                        {definition}
                    </div>
                </div>
            </div>
            <div id='TrueFalseCardHelpDisplay'>
                Your answer
            </div>
            <div id='TrueFalseCardSelection'>
                <button className='TrueFalseCardBtn' onClick={()=>handleTrueClicked()} style={{backgroundColor:trueClicked?"grey":""}}>true</button>
                <button className='TrueFalseCardBtn' onClick={()=>handleFalseClicked()} style={{backgroundColor:falseClicked?"grey":""}}>false</button>
            </div>
        </div>
        </>
    )
}
export default TrueFalseCard
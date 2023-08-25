import React, { useState } from 'react'
import "./TrueFalseArea.css";
import TrueFalseCard from './TrueFalseCard';

function TrueFalseArea (props) {
    const {trueFalseList,shuffledList,firstSection,listOfInputAnswers, setListOfInputAnswers} = props
    var adaptableShuffledList = shuffledList;

    function removeAndReturnElement(index) {
        if (index < 0 || index >= adaptableShuffledList.length) {
            throw new Error("Index out of range");
        }
    
        const removedElement = adaptableShuffledList.splice(index, 1)[0];
        return removedElement;
    }
    const randomizeTrueFalse=(currentIndex)=>{
        //50% chance the answer is true
        if(Math.random()<.5){
            return trueFalseList[currentIndex][1]
        }
        else{
            //Pick a random index (that is not the current index)
            let randomIndex = Math.floor(Math.random() * ((adaptableShuffledList.length-1)-firstSection))+firstSection

            return removeAndReturnElement(randomIndex)[1];
        }
    }
    
    return(
        <>
            {trueFalseList.map((item,index)=>(
                <div key={index} id='TrueFalseAreaFullWidth'>
                    <div id='TrueFalseAreaContainer'>
                        <TrueFalseCard term={trueFalseList[index][0]} definition={randomizeTrueFalse(index)} index={index} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers}/>
                    </div>
                </div>
            ))}
        </>
    )
}
export default TrueFalseArea
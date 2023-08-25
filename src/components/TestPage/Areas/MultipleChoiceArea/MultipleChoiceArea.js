import React, { useState } from 'react'
import "./MultipleChoiceArea.css";
import MultipleChoiceCard from './MultipleChoiceCard';

function MultipleChoiceArea (props) {
    const {multipleChoiceList,shuffledList,listOfInputAnswers,setListOfInputAnswers,startIndex} = props
    
    const shuffleArray=(arr)=>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    
    const getMcOptions=(i)=>{
        let finalListOfOptions = [multipleChoiceList[i][0]]
        let listOfOptions = shuffledList.filter((e)=>e!=i)
        for(let i = 0;i<3;i++){
            let randIndex = Math.floor(Math.random() * listOfOptions.length);
            finalListOfOptions.push(listOfOptions[randIndex][0])
            
            listOfOptions.splice(randIndex, 1)
        }
        finalListOfOptions=shuffleArray(finalListOfOptions)
        return finalListOfOptions
    }
    return(
        <>
            {multipleChoiceList.map((item,index)=>(
                <div key={index} id='MultipleChoiceAreaFullWidth'>
                    <div id='MultipleChoiceAreaContainer'>
                        <MultipleChoiceCard definition={multipleChoiceList[index][1]} multipleChoiceOptions={getMcOptions(index)} index={startIndex+index} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers}/>
                    </div>
                </div>
            ))}
        </>
    )
}
export default MultipleChoiceArea
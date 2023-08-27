import React, { useState } from 'react'
import "./MultipleChoiceCard.css";
import IndexHeader from '../../GeneralComponents/IndexHeader';

function MultipleChoiceCard (props) {
    const {multipleChoiceList, shuffledList,index,startIndex,listOfInputAnswers,setListOfInputAnswers}=props;

    const shuffleArray=(arr)=>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }
    const [choicePicked,setChoicePicked] = useState(null)
    
    const [multipleChoiceOptions,setMultipleChoiceOptions] = useState(()=>{
        let finalList = [multipleChoiceList[index][0]]
        let tempOptions = shuffleArray(shuffledList).slice(0,4)
        for(let i=0;i<3;i++){
            finalList.push(tempOptions[i][0])
        }
        return shuffleArray(finalList)
    });

    const handleChoiceClicked = (i) => {
        let tempListAnswers = listOfInputAnswers;
        if(choicePicked!==i){
            tempListAnswers[index+startIndex]= (multipleChoiceList[index][0] === multipleChoiceOptions[i]);
            setChoicePicked(i)
        }
        else{
            tempListAnswers[index+startIndex]=null;
            setChoicePicked(null)
        }
        setListOfInputAnswers(tempListAnswers);
    }
    return(
        <>
            <div id='MultipleChoiceCardContainer'>
                <IndexHeader index={startIndex+index+1}/>
                <div id='MultipleChoiceCardTopArea'>
                    <p id='MultipleChoiceCardTermDefHeader'>Definition</p>
                    <p id='MultipleChoiceCardDefDisplay'>{multipleChoiceList[index][1]}</p>
                </div>
                <div>
                    <p id='MultipleChoiceCardOptionLabel'>Options:</p>
                    <div id='MultipleChoiceCardOptionsContainer'>
                        <div className="grid-container">
                            <button className="MutltipleChoiceCardOption" onClick={()=>handleChoiceClicked(0)} style={choicePicked===0?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[0]}</button>
                            <button className="MutltipleChoiceCardOption" onClick={()=>handleChoiceClicked(1)} style={choicePicked===1?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[1]}</button>
                            <button className="MutltipleChoiceCardOption" onClick={()=>handleChoiceClicked(2)} style={choicePicked===2?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[2]}</button>
                            <button className="MutltipleChoiceCardOption" onClick={()=>handleChoiceClicked(3)} style={choicePicked===3?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[3]}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MultipleChoiceCard
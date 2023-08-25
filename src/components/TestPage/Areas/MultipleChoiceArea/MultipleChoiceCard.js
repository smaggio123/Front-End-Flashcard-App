import React, { useState } from 'react'
import "./MultipleChoiceCard.css";
import IndexHeader from '../../GeneralComponents/IndexHeader';

function MultipleChoiceCard (props) {
    const {definition,multipleChoiceOptions,index,listOfInputAnswers,setListOfInputAnswers}=props;
    const [choicePicked,setChoicePicked] = useState(null)
    const handleChoiceClicked = (i) => {
        let tempListAnswers=[]
        if(choicePicked!==i){
            tempListAnswers = listOfInputAnswers;
            tempListAnswers[index]=multipleChoiceOptions[i];
            setListOfInputAnswers(tempListAnswers);
            setChoicePicked(i)
        }
        else{
            tempListAnswers = listOfInputAnswers;
            tempListAnswers[index]=null;
            setListOfInputAnswers(tempListAnswers);
            setChoicePicked(null)
        }
    }
    return(
        <>
            <div id='MultipleChoiceCardContainer'>
                <IndexHeader index={index+1}/>
                <div id='MultipleChoiceCardTopArea'>
                    <p id='MultipleChoiceCardTermDefHeader'>Definition</p>
                    <p id='MultipleChoiceCardDefDisplay'>{definition}</p>
                </div>
                <div>
                    <p id='MultipleChoiceCardOptionLabel'>Options:</p>
                    <div id='MultipleChoiceCardOptionsContainer'>
                        <div className="grid-container">
                            <button className="grid-item" onClick={()=>handleChoiceClicked(0)} style={choicePicked===0?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[0]}</button>
                            <button className="grid-item" onClick={()=>handleChoiceClicked(1)} style={choicePicked===1?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[1]}</button>
                            <button className="grid-item" onClick={()=>handleChoiceClicked(2)} style={choicePicked===2?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[2]}</button>
                            <button className="grid-item" onClick={()=>handleChoiceClicked(3)} style={choicePicked===3?{backgroundColor:"grey"}:{backgroundColor:""}}>{multipleChoiceOptions[3]}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MultipleChoiceCard
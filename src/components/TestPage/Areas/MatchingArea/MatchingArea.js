import React, { useState } from 'react'
import "./MatchingArea.css";
import MatchingCard from './MatchingCard';

function MatchingArea (props) {
    const {matchingList,shuffledList,listOfInputAnswers,setListOfInputAnswers,startIndex,totalPairs}=props;
    const [listOfTerms,setListOfTerms] = useState(()=>{
        let tempList = []
        for(let i = 0;i<matchingList.length;i++){
            tempList.push([matchingList[i][0],i])
        }
        return tempList
    })
    
    const [listOfDefs,setListOfDefs] = useState(()=>{
        let tempList = []
        for(let i = 0;i<matchingList.length;i++){
            tempList.push([matchingList[i][1],i])
        }
        return tempList
    })

    const shuffleArray=(arr)=>{
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }

    const [fullShuffledList,setFullShuffledList] = useState(()=>{
        return [shuffleArray(listOfTerms),shuffleArray(listOfDefs)]
    })
    return(
        <>
            <div id='MatchingAreaFullWidth'>
                <MatchingCard termList={fullShuffledList[0]} defList={fullShuffledList[1]} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers} index={startIndex+1} totalPairs={totalPairs}/>
            </div>
        </>
    )
}
export default MatchingArea
import React, { useState } from 'react'
import "./TestPage.css";
import TitleHeader from '../TitleHeader';
import LearnBtn from '../LearnBtn';
import TrueFalseArea from './Areas/TrueFalseArea/TrueFalseArea';
import MultipleChoiceArea from './Areas/MultipleChoiceArea/MultipleChoiceArea';
import MatchingArea from './Areas/MatchingArea/MatchingArea';

function TestPage () {
    const [showTest,setShowTest] = useState(false)
    const [listOfPairs,setListOfPairs] = useState([
        ['term 1','def 1'],
        ['term 2','def 2'],
        ['term 3','def 3'],
        ['term 4','def 4'],
        ['term 5','def 5'],
        ['term 6','def 6'],
        ['term 7','def 7'],
        ['term 8','def 8'],
        ['term 9','def 9'],
        ['term 10','def 10'],
        ['term 11','def 11'],
        ['term 12','def 12'],
        ['term 13','def 13'],
        ['term 14','def 14'],
        ['term 15','def 15'],
        ['term 16','def 16'],
        ['term 17','def 17'],
        ['term 18','def 18'],
        ['term 19','def 19'],
        ['term 20','def 20'],
    ])
    const [listOfInputAnswers, setListOfInputAnswers] = useState(Array.from({ length: listOfPairs.length }).fill(null));
    const shufflePairs=()=>{
        let tempArr = listOfPairs;
        for (let i = tempArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
        }
        return tempArr
    }
    const [shuffledList,setShuffledList]=useState(shufflePairs())

    const section = (section,totalSections) => {
        return Math.floor(shuffledList.length/totalSections)*section
    }
    var trueFalseList = shuffledList.slice(0,section(1,4))
    var multipleChoiceList = shuffledList.slice(section(1,4),section(2,4))
    var matchingList = shuffledList.slice(section(2,4),section(3,4))
    var writtenList = shuffledList.slice(section(3,4),shufflePairs.length)



    return(
    <>
        <LearnBtn/>
        <TitleHeader title={"Test"}/>
        {showTest?
        <>
        </>
        :
        <>
        <div id='TestPageTrueFalseArea'>
            <TrueFalseArea trueFalseList={trueFalseList} shuffledList={shuffledList} firstSection={section(1,4)} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers}/>
        </div>
        <div id='TestPageMultipleChoiceArea'>
            <MultipleChoiceArea multipleChoiceList={multipleChoiceList} shuffledList={shuffledList} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers} startIndex={section(1,4)}/>
        </div>
        <div id='TestPageMatching'>
            <MatchingArea matchingList={matchingList} shuffledList={shuffledList} listOfInputAnswers={listOfInputAnswers} setListOfInputAnswers={setListOfInputAnswers} startIndex={section(2,4)} totalPairs={section(3,4)}/>
        </div>
        <div id='TestPageWrittenArea'>

        </div>
        </>
        }
    </>
    )
}
export default TestPage
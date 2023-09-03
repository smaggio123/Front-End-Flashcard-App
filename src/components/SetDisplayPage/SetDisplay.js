import React, { useState } from 'react'
import "./SetDisplay.css";
import { useLocation,useNavigate } from 'react-router-dom';
import HomeBtn from '../HomeBtn';

function SetDisplay () {
    let navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');
    // var cardIndex=0;
    // var wordRevealed=0;
    const setList = [["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]];
    const [cardWord, setCardWord] = useState(setList[0][0]);
    const [cardIndex, setCardIndex] = useState(0);
    const [termOrDefinition, setTermOrDefinition] = useState(0);
    
    const handleMatch = () =>{
        navigate(`./matching?data=${encodeURIComponent(selectedData)}`)
    }
    const handleCopyArea = () =>{
        navigate(`./copy?data=${encodeURIComponent(selectedData)}`)
    }
    const handleWrittenArea = () =>{
        navigate(`./written?data=${encodeURIComponent(selectedData)}`)
    }
    const handleTest = () =>{
        navigate(`./test?data=${encodeURIComponent(selectedData)}`)
    }
    const handleEdit = () =>{
        navigate(`./edit?data=${encodeURIComponent(selectedData)}`)
    }
    
    const handleLeft = () =>{
        setTermOrDefinition(0)
        let nextCard=cardIndex;
        nextCard-=1;
        if(nextCard<0){
            nextCard=setList.length-1;
            setCardIndex(setList.length-1);
        }
        else{
            setCardIndex(nextCard)
        }
        setCardWord(setList[nextCard][0])
    }
    const handleRight = () =>{
        setTermOrDefinition(0)
        let nextCard=cardIndex;
        nextCard=(nextCard+1)%setList.length;
        setCardIndex(nextCard);
        setCardWord(setList[nextCard][0])
    }
    const flipCard = () =>{
        if(termOrDefinition===0){
            setTermOrDefinition(1);
            setCardWord(setList[cardIndex][1])
        }
        else{
            setTermOrDefinition(0)
            setCardWord(setList[cardIndex][0])
        }
        
    }
    
    return (
    <>
    <HomeBtn/>
        <div className='setDisplayContainer'>
            <h1 className='setDisplayHeader'>{selectedData}</h1>
            <div className="setDisplayButtonContainer">
                {/* Learn, Test, Match, Edit */}
                <button className='setDisplayOptionButton' onClick={() => handleCopyArea()}>Copy Area</button>
                <button className='setDisplayOptionButton' onClick={() => handleMatch()}>Match</button>
                <button className='setDisplayOptionButton' onClick={() => handleWrittenArea()}>Written</button>
                <button className='setDisplayOptionButton' onClick={() => handleTest()}>Test</button>
                <button className='setDisplayOptionButton' onClick={() => handleEdit()}>Edit</button>
            </div>
            <div className='setDisplayCardContainer'>
                <button className='setDisplayCardButton' onClick={()=>handleLeft()}><i className="fa-solid fa-arrow-left"></i></button>
                <div className='setDisplayCard' onClick={() => flipCard()}>
                    <h3 className='setDisplayCardWord'>
                        {cardWord}
                    </h3>
                </div>
                <button className='setDisplayCardButton' onClick={()=>handleRight()}><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div>
            {setList.map((item, index) => (
                <div className='setDisplaySetCard'>
                    <h3 className='setDisplaySetCardWord'>{item[0]}</h3>
                    <h3 className='setDisplaySetCardWord'>|</h3>
                    <h3 className='setDisplaySetCardWord'>{item[1]}</h3>
                </div>
            ))}
            </div>
        </div>
        
    </>
    )
}
export default SetDisplay
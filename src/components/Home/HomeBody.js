import React, { useState } from 'react'
import {useLocation, useNavigate } from 'react-router-dom';
import './HomeBody.css'
import PopUpMenu from './PopupMenu';

function HomeBody() {
    let navigate = useNavigate();
    const [showMyPopUpMenu, setShowMyPopUpMenu] = useState(true);
    const [currentPopupMenuIndex,setCurrentPopupMenuIndex] = useState(-1);
    const [list,setList] = useState(['one','two','three','four', 'five'])
    
    //const selectedID = new URLSearchParams(useLocation().search).get('user')
    const handleButtonDoubleClick = (listItem) => {
        navigate(`/home/SetDisplay?data=${encodeURIComponent(listItem)}`)
        //navigate(`/home/SetDisplay?data=${encodeURIComponent(listItem)}?user=${selectedID}`)
    }

    const popupClicked = (i) =>{
        if(i!==currentPopupMenuIndex){
            setCurrentPopupMenuIndex(i)
            setShowMyPopUpMenu(true);
        }
        else{
            setShowMyPopUpMenu(!showMyPopUpMenu);
        }
    }
    const handleAddSet=()=>{
        navigate(`/home/add`)
    }

    return(
        <>
            <div className="content">
                <div id='HomeBodyListContainer'>
                {list.map((item, index) => (
                    <div key={index}>
                        <div>
                            <div  id='HomeBodySet' onDoubleClick={() => handleButtonDoubleClick(item)}>
                                {item}
                                <button id="homeBodyMenuBtn" onClick={()=>popupClicked(index)}>...</button>
                            </div>
                        </div>
                        {showMyPopUpMenu&&currentPopupMenuIndex===index?(
                            <div>
                                <PopUpMenu list={list} setList={setList} index={currentPopupMenuIndex}/>
                            </div>
                        ):<></>}
                    </div>
                ))}
                </div>
            </div>
            <button id='HomeBodyAddBtn' onClick={()=>handleAddSet()}><i className="fa-solid fa-plus" style={{color:"#fafafa"}}></i></button>
        </>
    )
}
export default HomeBody
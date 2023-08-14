import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomeBody.css'
import PopUpMenu from './PopupMenu';

function HomeBody() {
    let navigate = useNavigate();
    const [showMyPopUpMenu, setShowMyPopUpMenu] = useState(true);
    const [currentPopupMenuIndex,setCurrentPopupMenuIndex] = useState(-1);
    const [list,setList] = useState(['one','two','three','four', 'five'])
    
    const handleButtonDoubleClick = (listItem) => {
        navigate(`/home/SetDisplay?data=${encodeURIComponent(listItem)}`)
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
    return(
        <>
            <div className="content">
                <table id='homeBodyTable'>
                    <tbody>

                        {list.map((item, index) => (
                            <tr className='homeBodyTr' key={index}>
                                <td 
                                className='homeBodyTd' 
                                key={index} onDoubleClick={() => handleButtonDoubleClick(item)}>{item}
                                <button id="homeBodyMenuBtn" onClick={()=>popupClicked(index)}>...</button>
                                </td>
                                {showMyPopUpMenu&&currentPopupMenuIndex===index?(
                                    <PopUpMenu list={list} setList={setList} index={currentPopupMenuIndex}/>
                                ):<></>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default HomeBody
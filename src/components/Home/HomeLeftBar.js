import React, { useState } from 'react'
import './HomeLeftBar.css'
import FolderPopupMenu from './FolderPopupMenu';

function HomeLeftBar() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [showMyPopUpMenu, setShowMyPopUpMenu] = useState(true);
    const [currentPopupMenuIndex,setCurrentPopupMenuIndex] = useState(-1);
    const [folderList, setFolderList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
    const handleFolderClick = (folderIndex) => {
        setSelectedFolder(folderIndex);
      };
    const handleAddClicked = () =>{
        const tempList = [...folderList];
        let userInputName = prompt("Add folder");
        if(userInputName!=null){
            setShowMyPopUpMenu(false)
            //Backend operation
            
            //Frontend operation
            tempList.push(userInputName);
            setFolderList(tempList);
            setSelectedFolder(folderList.length-1)
        }
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
    
      return (
          <>
            <div className="sidebar">
                {/* Left side div */}
                <div className="left-sidebar">
                    <div id='homeLeftBarTable'>
                        <div className='homeLeftBarFolderSelect'>Folders</div>
                        {folderList.map((item, index) => (
                            <div key={index}>
                            <div className='HomeLeftBarFolder'>
                                <div className={`homeLeftBarFolderSelect ${selectedFolder===index ? 'clicked' : ''}`} key={index} onClick={() => handleFolderClick(index)}>{folderList[index]}
                                    <button id="HomeLeftBarMenuBtn" onClick={()=>popupClicked(index)}>...</button>

                                </div>
                            </div>
                            {showMyPopUpMenu&&currentPopupMenuIndex===index?(
                                <div>
                                    <FolderPopupMenu list={folderList} setList={setFolderList} selectedIndex={currentPopupMenuIndex} listedIndex={index} setShowMyPopUpMenu={setShowMyPopUpMenu}/>
                                </div>
                            ):<></>}
                            </div>
                        ))}
                        <button className='homeLeftBarFolderSelect' onClick={()=>handleAddClicked()}>+</button>
                    </div>
                </div>
            </div>
        </>
  )
}
export default HomeLeftBar
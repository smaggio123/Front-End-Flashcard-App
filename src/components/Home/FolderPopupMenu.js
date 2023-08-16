import React from 'react'
import './FolderPopupMenu.css'


function FolderPopupMenu({list, setList, index, setShowMyPopUpMenu}) {
    const handleDeleteClicked = () => {
        if(window.confirm("Are you sure you wish to delete?")){
            //Do backend stuff here

            //Frontend stuff
            setList(list.filter((value, iindex) => index !== iindex));
        }
        else{
            alert("Did not delete")
        }
    }
    const renameOptionClicked = () => {
        let tempList = list;
        let userInputName = prompt("Rename folder",list[index]);
        if(userInputName!=null){
            setShowMyPopUpMenu(false)
            tempList[index] = userInputName;
            setList(tempList);
        }
    }

    return(
        <>
            <div id='FolderPopupMenuContainer'>
                <button className='FolderPopupMenuBtn' onClick={()=>renameOptionClicked()}>Rename</button>
                <hr className='FolderPopupMenuDivider'/>
                <button className='FolderPopupMenuBtn' onClick={() => handleDeleteClicked()}>Delete</button>
            </div>
        </>
    )
}
export default FolderPopupMenu
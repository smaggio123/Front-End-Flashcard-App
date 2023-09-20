import React from 'react'
import { useNavigate } from 'react-router-dom';
import './PopupMenu.css'


function PopupMenu({list, setList, index}) {

    let navigate = useNavigate();
    
    const handleEditClicked = () =>{
        navigate(`./SetDisplay/edit?data=${encodeURIComponent(list[index])}`)
    }
    const handleDeleteClicked = () => {
        if(window.confirm("Are you sure you wish to delete?")){
            setList(list.filter((value, iindex) => index !== iindex));
        }
        else{
            alert("Did not delete")
        }
    }
    const handleSharedClicked = () => {
        navigator.clipboard.writeText('http://localhost:3000/home/SetDisplay?data='+encodeURIComponent(list[index]))
        alert("Copied link to clipboard")
    }
    
    return(
        <>
            <div style={{top:`${(index*81.5)+146}px`}} id='PopupMenuContainer'>
                <button className='PopupMenuBtn' onClick={()=> handleEditClicked()}>Edit</button>
                <hr className='PopupMenuDivider'/>
                <button className='PopupMenuBtn' onClick={() => handleDeleteClicked()}>Delete</button>
                <hr className='PopupMenuDivider'/>
                <button className='PopupMenuBtn'>Move</button>
                <hr className='PopupMenuDivider'/>
                <button className='PopupMenuBtn' onClick={()=>handleSharedClicked()}>Share</button>
            </div>
        </>
    )
}
export default PopupMenu
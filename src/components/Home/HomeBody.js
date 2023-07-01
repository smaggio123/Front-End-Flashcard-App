import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './HomeBody.css'

function HomeBody() {
    let navigate = useNavigate();
    const [selectedSet, setSelectedSet] = useState(null);
    const [showPopUpMenu, setShowPopUpMenu] = useState(null);
    const list = ['one','two','three','four', 'five']
    const handleButtonClick = (listItem) => {
        setSelectedSet(listItem);
        //alert(listItem);
    }
    const handleButtonDoubleClick = (listItem) => {
        navigate(`/home/SetDisplay?data=${encodeURIComponent(listItem)}`)
    }
    const toggleOptions = (listItem) => {
        console.log('clicked');
        setSelectedSet(listItem);
        setShowPopUpMenu(!showPopUpMenu);
      };
    
    const handleEdit = () => {
        // Logic for handling the edit option
        console.log('Edit option selected');
      };
    
     const handleDelete = () => {
        // Logic for handling the delete option
        console.log('Delete option selected');
      };
      const handleMove = () =>{
        console.log("moved")
      };
      const handleShare = () =>{
        console.log("shared")
      };
      
    return(
        <>
            <div className="content">
                <table id='homeBodyTable'>
                    <tbody>

                {list.map((item, index) => (
                    <tr className='homeBodyTr'>
                        <td 
                        className={`homeBodyTd ${selectedSet===item ? 'clicked' : ''}`} 
                        key={index} onClick={() => handleButtonClick(item)} onDoubleClick={() => handleButtonDoubleClick(item)}>{item}
                        </td>
                        <div className="options-box" onClick={()=>toggleOptions(item)}>
                            Options
                                <div>
                                    {/* <div className="options-toggle" ></div> */}
                                    {showPopUpMenu &&selectedSet===item? (
                                    <div className="options-menu">
                                    <div className='item' onClick={()=>handleEdit()}>Edit</div>
                                    <div className='item' onClick={()=>handleDelete()}>Delete</div>
                                    <div className='item' onClick={()=>handleMove()}>Move</div>
                                    <div className='item' onClick={()=>handleShare()}>Share</div>
                                    </div>
                                    ):
                                    <></>
                                    }
                                </div>
                            </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default HomeBody
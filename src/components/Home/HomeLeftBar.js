import React, { useState } from 'react'
import './HomeLeftBar.css'

function HomeLeftBar() {
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [folderList, setFolderList] = useState([]);
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const handleFolderClick = (folder) => {
        setSelectedFolder(folder);
        // alert("clicked on "+folder);
      };

      const handleAdd = () =>{
        alert("Add folder")
    }
    const handleEdit = () =>{
          alert("Edit folder")
        }
        const handleDelete = () =>{
            const result = window.confirm('Do you want to proceed?');
            if (result) {
                alert("clicked yes")
            } else {
                alert('clicked no')
            }
      }
    
      return (
          <>
            <div className="sidebar">
            <div className="button-container">
                <button className="button" onClick={() => handleAdd()}>Add</button>
                <button className="button" onClick={() => handleEdit()}>Edit</button>
                <button className="button" onClick={() => handleDelete()}>Delete</button>
            </div>
                {/* Left side div */}
                <div className="left-sidebar">
                <table id='homeLeftBarTable'>
                        {data.map((item, index) => (
                        <tr>
                            <td className={`homeLeftBarTd ${selectedFolder===item ? 'clicked' : ''}`} key={index}  onClick={() => handleFolderClick(item)}>{item}</td>
                        </tr>
                            ))}
                </table>
                </div>
            </div>
        </>
  )
}
export default HomeLeftBar
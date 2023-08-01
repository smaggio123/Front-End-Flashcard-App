import React, { useState } from 'react'
import "./EditPage.css";
import { useLocation,useNavigate } from 'react-router-dom';
import EditCard from './EditCard';
import EditTitleCard from './EditTitleCard';
function EditPage () {
    const [getList,setList] =useState([["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]]);

    const EditPageSaveClicked = () =>{
        //Implement saving list here
        console.log(getList)
    }

    return(
        <>
            <div id='editPageContainingDiv'>
                <h1 id='editPageTitleHeading'>Edit</h1>
                <EditTitleCard/>
                {getList.map((item, index) => (
                    <div key={index}>
                        <EditCard term={getList[index][0]} definition={getList[index][1]} GL={getList} SL={setList} pairIndex={index}/>
                    </div>
                ))}
            </div>
            <button id='EditPageSaveBtn' onClick={EditPageSaveClicked}>Save</button>

        </>
    )
}
export default EditPage
import React, { useState } from 'react'
import "./EditPage.css";
import { useLocation,useNavigate } from 'react-router-dom';
import EditCard from './EditCard';
import EditTitleCard from './EditTitleCard';
function EditPage () {
    const setList = [["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]];


    return(
        <>
            <div id='editPageContainingDiv'>
                <h1 id='editPageTitleHeading'>Edit</h1>
                <EditTitleCard/>
                {setList.map((item, index) => (
                    <div key={index}>
                        <EditCard word1={setList[index][0]} word2={setList[index][1]} pairIndex={index}/>
                    </div>
            ))}

            </div>

        </>
    )
}
export default EditPage
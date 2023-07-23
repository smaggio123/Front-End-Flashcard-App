import React, { useState } from 'react'
import "./EditPage.css";
import { useLocation,useNavigate } from 'react-router-dom';
import EditCard from './EditCard';
function EditPage () {
    const setList = [["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]];


    return(
        <>
        <div id='editPageContainingDiv'>
            <h1 id='editPageTitleHeading'>Edit</h1>
            <EditCard word1={setList[0][0]} word2={setList[0][1]}/>

        </div>

        </>
    )
}
export default EditPage
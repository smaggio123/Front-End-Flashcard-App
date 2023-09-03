import React, { useState } from 'react'
import "./EditPage.css";
import EditCard from './EditCard';
import EditTitleCard from './EditTitleCard';
import LearnBtn from '../LearnBtn';
function EditPage () {
    const [getList,setList] =useState([["word1","def1"],["word2","def2"],["word3","def3"],["word4","def4"],["word5","def5"]]);

    const EditPageSaveClicked = () =>{
        //Implement saving list here
        console.log(getList)
    }

    const handleSaveBtnClicked=()=>{
        const tempList = [...getList];
        tempList.push(["",""])
        setList(tempList)
    }

    return(
        <>
        <LearnBtn/>
            <div id='editPageContainingDiv'>
                <h1 id='editPageTitleHeading'>Edit</h1>
                <EditTitleCard/>
                {getList.map((item, index) => (
                    <div key={item+index}>
                        <EditCard term={getList[index][0]} definition={getList[index][1]} getList={getList} setList={setList} pairIndex={index}/>
                    </div>
                ))}
            <button id='EditPageAddBtn' onClick={()=>handleSaveBtnClicked()}><i className="fa-solid fa-plus" style={{color:"#fafafa"}}></i></button>
            </div>
            <button id='EditPageSaveBtn' onClick={EditPageSaveClicked}>Save</button>

        </>
    )
}
export default EditPage
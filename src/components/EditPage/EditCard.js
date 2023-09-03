import React, { useState } from 'react'
import "./EditCard.css";


function EditCard (props) {
  const {getList, setList, pairIndex } = props

  const handleTextareaResize = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    if(event.target.style.height>document.getElementById('editCardContainingDiv').height){
        document.getElementById('editCardContainingDiv').height=event.target.style.height;
    }
  };

  const handleDeleteBtnClicked = () => {
    const tempList = [...getList]
    tempList.splice(pairIndex, 1);
    for(let i = 0;i<tempList.length;i++){
      tempList[i].id = i;
    }
    setList(tempList)
  }

  return (
    <div id='editCardContainingDiv' >
      <div id='EditCardHeaderContainer'>
        <h2 id='EditCardIndexHeader'>{pairIndex+1}</h2>
        <button id='EditCardRemoveBtn' onClick={()=>handleDeleteBtnClicked()}><i id='EditCardRemoveBtnLogo' className="fa-solid fa-trash"></i></button>
      </div>
      <hr id='EditCardIndexDivider'/>
      <div id="EditCardInnerContainingDiv" >
      <textarea
          value={getList[pairIndex].term}
          onChange={(e) => {
            let tempList = [...getList]
            tempList[pairIndex].term = e.target.value;
            setList(tempList)
          }
        }
          onInput={handleTextareaResize}
          className='editCardInput'
          id={'editCardTermInput'+pairIndex}
          rows={1}
          />
      <textarea
          value={getList[pairIndex].definition}
          onChange={(e) => {
            let tempList = [...getList]
            tempList[pairIndex].definition = e.target.value;
            setList(tempList)
          }}
          onInput={handleTextareaResize}
          className='editCardInput'
          id={'editCardDefInput'+pairIndex}
          rows={1}
          />
      </div>
    </div>
  );
}
export default EditCard
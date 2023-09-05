import React from 'react'
import "./EditCard.css";


function EditCard (props) {
  const {getList, setList, pairIndex } = props

  const handleTextareaResize = (event,thisId,otherId,thisContainerId,otherContainerId) => {
    let otherTxtArea = document.getElementById(otherId);
    let thisContainerDiv = document.getElementById(thisContainerId);
    let otherContainerDiv = document.getElementById(otherContainerId);
    let bigContainerDiv = document.getElementById('editCardContainingDiv'+pairIndex);
    bigContainerDiv.style.height = 'auto'
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    document.getElementById(thisId).height=event.target.style.height;
    thisContainerDiv.style.height=(Math.max((parseInt(event.target.style.height.substring(0,event.target.style.height.length-2))),parseInt(otherTxtArea.style.height.substring(otherTxtArea.style.length-2)))+'px');
    otherContainerDiv.style.height=(Math.max((parseInt(event.target.style.height.substring(0,event.target.style.height.length-2))),parseInt(otherTxtArea.style.height.substring(otherTxtArea.style.length-2)))+'px');
  }

  const handleDeleteBtnClicked = () => {
    const tempList = [...getList]
    tempList.splice(pairIndex, 1);
    for(let i = 0;i<tempList.length;i++){
      tempList[i].id = i;
    }
    setList(tempList)
  }

  return (
    <div id={'editCardContainingDiv'+pairIndex} className='editCardContainingDiv' style={{minHeight:'125px'}}>
      <div id='EditCardHeaderContainer'>
        <h2 id='EditCardIndexHeader'>{pairIndex+1}</h2>
        <button id='EditCardRemoveBtn' onClick={()=>handleDeleteBtnClicked()}><i id='EditCardRemoveBtnLogo' className="fa-solid fa-trash"></i></button>
      </div>
      <hr id='EditCardIndexDivider'/>
      <div id="EditCardInnerContainingDiv">
        <div id={'EditCardTermContainer'+pairIndex} className='EditCardTermDefContainer' style={{height:"20px"}}>
          <textarea
            style={{height:'20px'}}
              value={getList[pairIndex].term}
              onChange={(e) => {
                let tempList = [...getList]
                tempList[pairIndex].term = e.target.value;
                setList(tempList)
              }
            }
            onInput={(event)=>{
              handleTextareaResize(event,'editCardTermInput'+pairIndex,'editCardDefInput'+pairIndex,'EditCardTermContainer'+pairIndex,'EditCardDefContainer'+pairIndex)
            }}
            className='editCardInput'
              id={'editCardTermInput'+pairIndex}
              rows={1}
              />
          </div>
          <div id={'EditCardDefContainer'+pairIndex} className='EditCardTermDefContainer' style={{height:"20px"}}>
            <textarea
              style={{height:'20px'}}
                value={getList[pairIndex].definition}
                onChange={(e) => {
                  let tempList = [...getList]
                  tempList[pairIndex].definition = e.target.value;
                  setList(tempList)
                }}
                onInput={(event)=>{
                  handleTextareaResize(event,'editCardDefInput'+pairIndex,'editCardTermInput'+pairIndex,'EditCardDefContainer'+pairIndex,'EditCardTermContainer'+pairIndex)
                }}
                className='editCardInput'
                id={'editCardDefInput'+pairIndex}
                rows={1}
                />
            </div>
      </div>
    </div>
  );
}
export default EditCard
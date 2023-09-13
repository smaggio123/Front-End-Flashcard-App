import React, { useEffect, useRef} from 'react'
import "./EditCard.css";
import MySet from '../ObjectClasses/Set';


function EditCard (props) {
  const {thisPair, mySet, setMySet, cardIndex } = props

  const handleTextareaResize = (event,thisId,otherId,thisContainerId,otherContainerId) => {
    let otherTxtArea = document.getElementById(otherId);
    let thisContainerDiv = document.getElementById(thisContainerId);
    let otherContainerDiv = document.getElementById(otherContainerId);
    let bigContainerDiv = document.getElementById('editCardContainingDiv'+cardIndex);
    bigContainerDiv.style.height = 'auto'
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    document.getElementById(thisId).height=event.target.style.height;
    thisContainerDiv.style.height=(Math.max((parseInt(event.target.style.height.substring(0,event.target.style.height.length-2))),parseInt(otherTxtArea.style.height.substring(otherTxtArea.style.length-2)))+'px');
    otherContainerDiv.style.height=(Math.max((parseInt(event.target.style.height.substring(0,event.target.style.height.length-2))),parseInt(otherTxtArea.style.height.substring(otherTxtArea.style.length-2)))+'px');
  }

  const handleDeleteBtnClicked = () => {
    const tempList = [...mySet.getListOfData()];
    tempList.splice(cardIndex, 1);
    for(let i = 0;i<tempList.length;i++){
      tempList[i].setIndex(i);
    }
    const tempSet = new MySet(tempList,mySet.getSetId(),mySet.getFolderId(),mySet.getUserId());
    setMySet(tempSet)
  }

  
  const textarea1Ref = useRef(null);
  const textarea2Ref = useRef(null);
  const textArea1ContainerRef = useRef(null)
  const textArea2ContainerRef = useRef(null)

  useEffect(() => {
    if (textarea1Ref.current) {
      textarea1Ref.current.style.height = "auto";
      textarea1Ref.current.style.height = `${textarea1Ref.current.scrollHeight}px`;
    }
    if (textarea2Ref.current) {
      textarea2Ref.current.style.height = "auto";
      textarea2Ref.current.style.height = `${textarea2Ref.current.scrollHeight}px`;
    }
    if(textArea1ContainerRef.current){
      textArea1ContainerRef.current.style.height = "auto";
      textArea1ContainerRef.current.style.height=(Math.max((parseInt(textarea1Ref.current.style.height.substring(0,textarea1Ref.current.style.height.length-2))),parseInt(textarea2Ref.current.style.height.substring(textarea2Ref.current.style.length-2)))+'px');
    }
    if(textArea2ContainerRef.current){
      textArea2ContainerRef.current.style.height = "auto";
      textArea2ContainerRef.current.style.height=(Math.max((parseInt(textarea1Ref.current.style.height.substring(0,textarea1Ref.current.style.height.length-2))),parseInt(textarea2Ref.current.style.height.substring(textarea2Ref.current.style.length-2)))+'px');
    }
  }, []);
  
  return (
    <div id={'editCardContainingDiv'+cardIndex} className='editCardContainingDiv' style={{minHeight:'125px'}}>
      <div id='EditCardHeaderContainer'>
        <h2 id='EditCardIndexHeader'>{cardIndex+1}</h2>
        <button id='EditCardRemoveBtn' onClick={()=>handleDeleteBtnClicked()}><i id='EditCardRemoveBtnLogo' className="fa-solid fa-trash"></i></button>
      </div>
      <hr id='EditCardIndexDivider'/>
      <div id="EditCardInnerContainingDiv">
        <div ref={textArea1ContainerRef} id={'EditCardTermContainer'+cardIndex} className='EditCardTermDefContainer' style={{height:"20px"}}>
          <textarea
            ref={textarea1Ref}
            style={{height:'25px'}}
            value={thisPair.getTerm()}
            onChange={(e) => {
                let tempList = mySet.getListOfData();
                tempList[cardIndex].setTerm(e.target.value);
                let tempSet = new MySet(tempList,mySet.getSetId(),mySet.getFolderId(),mySet.getUserId());
                setMySet(tempSet);
            }}
            onInput={(event)=>{
              handleTextareaResize(event,'editCardTermInput'+cardIndex,'editCardDefInput'+cardIndex,'EditCardTermContainer'+cardIndex,'EditCardDefContainer'+cardIndex)
            }}
            className='editCardInput'
              id={'editCardTermInput'+cardIndex}
              rows={1}
          />
          </div>
          <div ref={textArea2ContainerRef} id={'EditCardDefContainer'+cardIndex} className='EditCardTermDefContainer' style={{height:"20px"}}>
            <textarea
              ref={textarea2Ref}
              style={{height:"25px"}}

              value={thisPair.getDef()}
              onChange={(e) => {
                let tempList = mySet.getListOfData();
                tempList[cardIndex].setDef(e.target.value);
                let tempSet = new MySet(tempList,mySet.getSetId(),mySet.getFolderId(),mySet.getUserId());
                setMySet(tempSet);
              }}
              onInput={(event)=>{
                handleTextareaResize(event,'editCardDefInput'+cardIndex,'editCardTermInput'+cardIndex,'EditCardDefContainer'+cardIndex,'EditCardTermContainer'+cardIndex)
              }}
              className='editCardInput'
              id={'editCardDefInput'+cardIndex}
              rows={1}
            />
            </div>
      </div>
    </div>
  );
}
export default EditCard
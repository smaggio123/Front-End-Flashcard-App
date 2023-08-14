import React, { useState } from 'react'
import "./EditCard.css";


function EditCard ({ term, definition, GL, SL, pairIndex }) {
  const [textarea1Content, setTextarea1Content] = useState(term);
  const [textarea2Content, setTextarea2Content] = useState(definition);
  const [getList,setList] = useState(GL);

  const handleTextareaChange = (event, setter) => {
    const { value } = event.target;
    setter(value);
    let tempList = getList;
    if(event.target.id==="editCardTermInput"){
      tempList[pairIndex][0]=value;
      setList(tempList)
    }
    else{
      tempList[pairIndex][1]=value;
      setList(tempList)
    }
  };

  const handleTextareaResize = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    if(event.target.style.height>document.getElementById('editCardContainingDiv').height){
        document.getElementById('editCardContainingDiv').height=event.target.style.height;
    }
  };

  return (
    <div id='editCardContainingDiv' >
      <h2 id='EditCardIndexHeader'>{pairIndex+1}</h2>
      <hr id='EditCardIndexDivider'/>
      <div id="EditCardInnerContainingDiv" >
      <textarea
          value={textarea1Content}
          onChange={(e) => handleTextareaChange(e, setTextarea1Content)}
          onInput={handleTextareaResize}
          className='editCardInput'
          id='editCardTermInput'
          rows={1}
          />
      <textarea
          value={textarea2Content}
          onChange={(e) => handleTextareaChange(e, setTextarea2Content)}
          onInput={handleTextareaResize}
          className='editCardInput'
          id='editCardDefInput'
          rows={1}
          />
      </div>
    </div>
  );
}
export default EditCard
import React, { useState } from 'react'
import "./EditCard.css";
import { useLocation,useNavigate } from 'react-router-dom';

function EditCard ({ word1, word2 }) {
    const [textarea1Content, setTextarea1Content] = useState(word1);
  const [textarea2Content, setTextarea2Content] = useState(word2);

  const handleTextareaChange = (event, setter) => {
    const { value } = event.target;
    setter(value);
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
        <div id="EditCardInnerContainingDiv" >
        <textarea
            value={textarea1Content}
            onChange={(e) => handleTextareaChange(e, setTextarea1Content)}
            onInput={handleTextareaResize}
            className='editCardInput'
            rows={1}
            />
        <textarea
            value={textarea2Content}
            onChange={(e) => handleTextareaChange(e, setTextarea2Content)}
            onInput={handleTextareaResize}
            className='editCardInput'
            rows={1}
            />
        </div>
    </div>
  );
}
export default EditCard
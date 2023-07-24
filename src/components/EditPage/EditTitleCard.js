import React, { useState } from 'react'
import "./EditTitleCard.css";
import { useLocation,useNavigate } from 'react-router-dom';

function EditTitleCard () {
    const [titleOfSet,setTitleOfSet] = useState("");
    return(
        <>
            <div id='EditTitleCardContainer'>
                <div id='EditTitleCardTitleHeaderContainer'>
                    <h2 id='EditTitleCardTitleHeader'>Title</h2>
                    <hr id='EditTitleCardDivider'></hr>
                    <input type='text' id='EditTitleCardInput' placeholder='Title of the set' onChange={(e) =>setTitleOfSet(e.target.value)}/>
                </div>
            </div>
        </>
    )
}
export default EditTitleCard;
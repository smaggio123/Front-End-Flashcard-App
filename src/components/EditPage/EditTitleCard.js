import React from 'react'
import "./EditTitleCard.css";
function EditTitleCard (props) {
    const {titleOfSet,setTitleOfSet} = props
    
    return(
        <>
            <div id='EditTitleCardContainer'>
                <div id='EditTitleCardTitleHeaderContainer'>
                    <h2 id='EditTitleCardTitleHeader'>Title</h2>
                    <hr id='EditTitleCardDivider'></hr>
                    <input type='text' id='EditTitleCardInput' placeholder='Title of the set' value={titleOfSet} onChange={(e) =>setTitleOfSet(e.target.value)}/>
                </div>
            </div>
        </>
    )
}
export default EditTitleCard;
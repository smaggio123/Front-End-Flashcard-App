import React, { useState } from 'react'
import "./IndexHeader.css";

function IndexHeader (props) {
    const {index}=props;
    return(
        <>
        <div id='IndexHeaderIndexLabel'>
            <p>{index}</p>
        </div>
        <hr id='IndexHeaderCardDivider'/>
        </>
    )
}
export default IndexHeader
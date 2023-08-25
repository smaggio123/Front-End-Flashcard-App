import React from 'react'
import "./TitleHeader.css";

function TitleHeader (props) {
    const {title}=props
    return(
    <>
    <div id='TitleHeaderContainer'>
        <h1 id='TitleHeader'>{title}</h1>
    </div>
    </>
    )
}
export default TitleHeader
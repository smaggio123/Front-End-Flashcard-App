import React from 'react'
import photo from "./search_icon.png"
import './HomeHeader.css'
function HomeHeader() {

  return (
    <>   
        <div id='homeHeader'>
            <input type="text" class="search-input" placeholder="Search..."/>
            <button class="search-button"><img id='homeSearchImage' src={photo} alt="S"/></button>
        </div>
    </>
  )
}
export default HomeHeader
import React from 'react'
import photo from "./search_icon.png"
import './HomeHeader.css'
function HomeHeader() {

  return (
    <>   
        <div id='homeHeader'>
          <h1 id='HomeHeaderTitle'>Flashcard App</h1>
            {/*     
            <input type="text" className="search-input" placeholder="Search..."/>
            <button className="search-button"><img id='homeSearchImage' src={photo} alt="S"/></button>
            */}
        </div>
    </>
  )
}
export default HomeHeader
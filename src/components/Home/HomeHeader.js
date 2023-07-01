import React from 'react'
import photo from "../search_icon.png"
import './HomeHeader.css'
function HomeHeader() {

  return (
    <>   
            <div id='homeHeader'>
                <input type="text" class="search-input" placeholder="Search..."/>
                <button class="search-button"><img id='homeSearchImage' src={photo} alt="S"/></button>
            {/* <div class="search-bar">
            </div> */}
            </div>
            {/* <div class="sidebar">
                <h2>Sidebar</h2>
            </div> 
            
            <div class="content">
                <h2>Body</h2>
                <p>This is the body content.</p>
            </div>
            */}
        </>
  )
}
export default HomeHeader
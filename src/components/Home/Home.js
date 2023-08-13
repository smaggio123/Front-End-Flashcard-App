import "./Home.css";
import HomeHeader from './HomeHeader';
import HomeLeftBar from './HomeLeftBar';
import HomeBody from './HomeBody';
import React from 'react'
import './HomeBody.css'

function Home () {
    return(
        <>
            <HomeHeader/>
            <HomeLeftBar/>
            <HomeBody/>
        </>
    )
}
export default Home
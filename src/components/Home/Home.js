
import "./Home.css";
import HomeHeader from './HomeHeader';
import HomeLeftBar from './HomeLeftBar';
import HomeBody from './HomeBody';
import React, { useState } from 'react'
import { Link,useNavigate,useHistory } from 'react-router-dom';
import './HomeBody.css'
import SetDisplay from "../SetDisplay";



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
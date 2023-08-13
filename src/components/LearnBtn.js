import "./LearnBtn.css";
import { React } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
function LearnBtn(){
    let navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');

    //Sends user back to learn page
    const handleBackTolearn = () =>{
        const { pathname } = location;
        const newUrl = `${pathname.substring(0, pathname.lastIndexOf('/'))}?data=${encodeURIComponent(selectedData)}`;
        navigate(newUrl)
    }
    return(
        <>
           <button id="copyAreaBackButton" onClick={()=>handleBackTolearn()}>Learn</button>
        </>
    )
}
export default LearnBtn
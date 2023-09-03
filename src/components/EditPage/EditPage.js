import React, { useState } from 'react'
import { useLocation} from 'react-router-dom';
import "./EditPage.css";
import EditCard from './EditCard';
import EditTitleCard from './EditTitleCard';
import LearnBtn from '../LearnBtn';
import TitleHeader from '../TitleHeader';
function EditPage (props) {
    const {mode,modeEnum} = props;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');
    const [titleOfSet,setTitleOfSet] = useState(selectedData);

    const [getList,setList] = useState(()=>{
        //Do backend stuff here

        //front end testing
        let list = [];
        if(mode === modeEnum.editSetMode){
            list = [
                ["term1","def1"],
                ["term2","def2"],
                ["term3","def3"],
                ["term4","def4"],
                ["term5","def5"],
            ]
        }
        else if(mode === modeEnum.addSetMode){
            list = [["",""]]
        }
        else{
            list = [];
        }
        return list
    });

    const EditPageSaveClicked = () =>{
        //Implement saving list here
        console.log("title: "+titleOfSet)
        console.log(getList)
    }

    const handleSaveBtnClicked=()=>{
        const tempList = [...getList];
        tempList.push(["",""])
        setList(tempList)
    }

    return(
        <>
        <LearnBtn/>
            <div id='editPageContainingDiv'>
                <TitleHeader title={"Edit"}/>
                <EditTitleCard titleOfSet={titleOfSet} setTitleOfSet={setTitleOfSet}/>
                {getList.map((item, index) => (
                    <div key={item+index}>
                    <EditCard term={getList[index][0]} definition={getList[index][1]} getList={getList} setList={setList} pairIndex={index}/>
                    </div>
                ))}
                <button id='EditPageAddBtn' onClick={()=>handleSaveBtnClicked()}><i className="fa-solid fa-plus" style={{color:"#fafafa"}}></i></button>
            </div>
            <button id='EditPageSaveBtn' onClick={EditPageSaveClicked}>Save</button>

        </>
    )
}
export default EditPage
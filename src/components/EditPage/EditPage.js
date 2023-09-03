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
    const [titleOfSet,setTitleOfSet] = useState(selectedData?selectedData:"");

    const [getList,setList] = useState(()=>{
        //Do backend stuff here

        //front end testing
        let list = [];
        if(mode === modeEnum.editSetMode){
            list = [
                {id: 0, term: "term1", definition: "def1"},
                {id: 1, term: "term2", definition: "def2"},
                {id: 2, term: "term3", definition: "def3"},
                {id: 3, term: "term4", definition: "def4"},
                {id: 4, term: "term5", definition: "def5"}
            ]
        }
        else if(mode === modeEnum.addSetMode){
            list = [{id:0,term:"",definition:""}]
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

    const handleAddBtnClicked=()=>{
        const tempList = [...getList];
        tempList.push({id:getList.length,term:"",definition:""})
        setList(tempList)
    }

    return(
        <>
        <LearnBtn/>
            <div id='editPageContainingDiv'>
                <TitleHeader title={"Edit"}/>
                <EditTitleCard titleOfSet={titleOfSet} setTitleOfSet={setTitleOfSet}/>
                {getList.map((item, index) => (
                    <div key={item.id}>
                    <EditCard term={item.term} definition={item.definition} getList={getList} setList={setList} pairIndex={index}/>
                    </div>
                ))}
                <button id='EditPageAddBtn' onClick={()=>handleAddBtnClicked()}><i className="fa-solid fa-plus" style={{color:"#fafafa"}}></i></button>
            </div>
            <button id='EditPageSaveBtn' onClick={()=>EditPageSaveClicked()}>Save</button>

        </>
    )
}
export default EditPage
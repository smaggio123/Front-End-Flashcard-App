import React, { useState } from 'react'
import { useLocation} from 'react-router-dom';
import "./EditPage.css";
import EditCard from './EditCard';
import EditTitleCard from './EditTitleCard';
import LearnBtn from '../LearnBtn';
import TitleHeader from '../TitleHeader';
import MySet from '../ObjectClasses/Set';
import MyPair from '../ObjectClasses/Pair';

function EditPage (props) {
    const {mode,modeEnum} = props;
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedData = searchParams.get('data');
    const [titleOfSet,setTitleOfSet] = useState(selectedData?selectedData:"");
    const [mySet,setMySet] = useState(
        ()=>{
            if(mode === modeEnum.editSetMode){
                return new MySet([
                    new MyPair(0,-1,"word1","def1"),
                    new MyPair(1,-1,"Diffusion","The passive movement of particles from an area of high concentration to low concentration"),
                    new MyPair(2,-1,"Osmosis","A passive movement of water molecules through a semi permeable membrane"),
                    new MyPair(3,-1,"Active Transport","An active movement where an input of energy is required"),
                    new MyPair(4,-1,"word5","def5"),
                ],null,null,null)
            }
            else if(mode === modeEnum.addSetMode){
                return new MySet([new MyPair(0,-1,"","")])
            }
            else{
                return new MySet();
            }
        }
    );

    const EditPageSaveClicked = () =>{
        //Implement saving list here
        console.log("title: "+titleOfSet)
        console.log(mySet.getListOfData())
    }

    const handleAddBtnClicked=()=>{
        const tempList = [...mySet.getListOfData()];
        tempList.push(new MyPair(mySet.getListOfDataLength(),-1,"",""));
        const tempSet = new MySet(tempList,mySet.getSetId(),mySet.getFolderId(),mySet.getUserId());
        setMySet(tempSet)
    }

    return(
        <>
        <LearnBtn/>
            <div id='editPageContainingDiv'>
                <TitleHeader title={"Edit"}/>
                <EditTitleCard titleOfSet={titleOfSet} setTitleOfSet={setTitleOfSet}/>
                {mySet.getListOfData().map((item, index) => (
                    <div key={item.getIndex()}>
                    <EditCard thisPair={item} mySet={mySet} setMySet={setMySet} cardIndex={index}/>
                    </div>
                ))}
                <button id='EditPageAddBtn' onClick={()=>handleAddBtnClicked()}><i className="fa-solid fa-plus" style={{color:"#fafafa"}}></i></button>
            </div>
            <button id='EditPageSaveBtn' onClick={()=>EditPageSaveClicked()}>Save</button>

        </>
    )
}
export default EditPage
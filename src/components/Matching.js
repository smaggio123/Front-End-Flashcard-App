import "./Matching.css";
import { React,useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Matching(){
    /*
    const [pairList,setPairList] = useState([
        ["term1","def1"],
        ["term2","def2"],
        ["term3","def3"],
        ["term4","def4"],
        ["term5","def5"],
    ]);
    */
    const [termsList,setTermsList]=useState([
        ["term1",0],
        ["term2",1],
        ["term3",2],
        ["term4",3],
        ["term5",4],
    ]);
    const [defList,setDefList] = useState([
        ["def1",0],
        ["def2",1],
        ["def3",2],
        ["def4",3],
        ["def5",4],
    ]);
    const [isMatchedArray,setIsMatchedArray] = useState(Array.from({ length: termsList.length }).fill(false));
    const [termSelectedArray,setTermSelectedArray] = useState(Array.from({ length: termsList.length }).fill(false));
    const [defSelectedArray,setDefSelectedArray] = useState(Array.from({ length: termsList.length }).fill(false));
    const [currentTermSelected,setCurrentTermSelected] = useState(-1);
    const [currentDefSelected,setCurrentDefSelected] = useState(-1);

    
    useEffect(() => {
        // This code will run after the component has rendered
        // Perform your desired actions here, such as fetching data or manipulating the DOM
        let dl = defList;
        setDefList(shuffleArray(dl));
        window.addEventListener('beforeunload', shuffleArray(dl));
    }, []); // Empty dependency array ensures that the effect runs only once (similar to componentDidMount)
      
    // Fisher-Yates shuffle algorithm
    //Shuffles the list of terms and definitions
    const shuffleArray = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const unselectPair=()=>{
        setTermSelectedArray(Array.from({ length: termsList.length }).fill(false));
        setDefSelectedArray(Array.from({ length: termsList.length }).fill(false));
        setCurrentTermSelected(-1);
        setCurrentDefSelected(-1);
    }

    const handleTermClick = (index) => {
        if(isMatchedArray[index])return
        if(currentDefSelected!==-1&&index===currentDefSelected){
            //Handling matched
            let tempMatchedArray = isMatchedArray;
            tempMatchedArray[index]=true;
            setIsMatchedArray(tempMatchedArray)
            console.log("Matched at: "+index)
            //handling unselection of term and definition
            unselectPair();
        }
        else if(!isMatchedArray[index]){
            //True if term was already selected
            let alreadySelected = currentTermSelected===index;
            //Resets array to deselect previous term
            let tempSelectedArray = Array.from({ length: termsList.length }).fill(false);
            //Sets current term
            tempSelectedArray[index] = !alreadySelected;
            setTermSelectedArray(tempSelectedArray);
            //If term already selected, it will be deselected
            if(alreadySelected)setCurrentTermSelected(-1);
            else setCurrentTermSelected(index);
        }
    }
    
    const handleDefClick = (index) => {
        if(isMatchedArray[index])return
        if(currentTermSelected!==-1&&index===currentTermSelected){
            //Handling matched
            let tempMatchedArray = isMatchedArray;
            tempMatchedArray[index]=true;
            setIsMatchedArray(tempMatchedArray)
            console.log("Matched at: "+index)
            
            //handling unselection of term and definition
            unselectPair();
        }
        else if(!isMatchedArray[index]){
            //True if definition was already selected
            let alreadySelected = currentDefSelected===index;
            //Resets array to deselect previous definition
            let tempSelectedArray = Array.from({ length: termsList.length }).fill(false);
            //Sets current definition
            tempSelectedArray[index] = !alreadySelected;
            setDefSelectedArray(tempSelectedArray);
            //If definition already selected, it will be deselected
            if(alreadySelected)setCurrentDefSelected(-1);
            else setCurrentDefSelected(index);
        }
    }
    const getMatchingTermClassName=(index)=>{
        if(isMatchedArray[index]){
            return "matchingMatchedPair";
        }
        else if(termSelectedArray[index]){
            return "matchingSelected";
        }
        else{
            return "matchingUnselected";
        }
    }
    const getMatchingDefClassName=(index)=>{
        if(isMatchedArray[index]){
            return "matchingMatchedPair";
        }
        else if(defSelectedArray[index]){
            return "matchingSelected";
        }
        else{
            return "matchingUnselected";
        }
    }

    return (
        <>
            <div id="MatchingContainingDiv">
                <h1 id="MatchingTitleHeader">Matching</h1>
                <div id="MatchingColumnsArea">
                    <div className="column">
                        {termsList.map((term, index) => (
                        <div
                        key={index}
                        className={getMatchingTermClassName(index)}
                        onClick={() => handleTermClick(term[1])}
                        >
                            {term[0]}
                        </div>
                        ))}
                    </div>
                    <div className="column">
                        {defList.map((def, index) => (
                        <div
                        key={index}
                        className={getMatchingDefClassName(index)}
                        onClick={() => handleDefClick(def[1])}
                        >
                            {def[0]}
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Matching;
import "./Matching.css";
import { React,useState,useEffect, Component } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

class MatchingClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            termsList:[
                ["term1",0],
                ["term2",1],
                ["term3",2],
                ["term4",3],
                ["term5",4],
            ],
            defList:[
                ["def1",0],
                ["def2",1],
                ["def3",2],
                ["def4",3],
                ["def5",4],
            ],
        }
    }
    componentDidMount() {
        this.shuffleArray();
        window.addEventListener('beforeunload', this.shuffleArray);
      }
    
      componentWillUnmount() {
        window.removeEventListener('beforeunload', this.shuffleArray);
      }
    shuffleArray() {

        const shuffledDef = [...this.state.defList];
        for (let i = shuffledDef.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDef[i], shuffledDef[j]] = [shuffledDef[j], shuffledDef[i]];
        }
        this.setState({ defList: shuffledDef });
    }
    render(){
        const {isMatchedArrayTerm,setIsMatchedArrayTerm,isMatchedArrayDef,setIsMatchedArrayDef,termSelectedArray,setTermSelectedArray,defSelectedArray,setDefSelectedArray,currentTermSelected,setCurrentTermSelected,currentDefSelected,setCurrentDefSelected} = this.props;
        
        
        const unselectPair=()=>{
            setTermSelectedArray(Array.from({ length: this.state.termsList.length }).fill(false));
            setDefSelectedArray(Array.from({ length: this.state.termsList.length }).fill(false));
            setCurrentTermSelected(-1);
            setCurrentDefSelected(-1);
        }
        const handleMatchedOnTerm=(arrayIndex)=>{
            //Handling matched
            //Updating term
            let tempMatchedArrayTerms = isMatchedArrayTerm;
            tempMatchedArrayTerms[arrayIndex]=true;
            setIsMatchedArrayTerm(tempMatchedArrayTerms);
            //Updating definition
            let tempMatchedArrayDefs = isMatchedArrayDef;
            tempMatchedArrayDefs[currentDefSelected]=true;
            setIsMatchedArrayDef(tempMatchedArrayDefs);
            console.log("Term matched at: "+arrayIndex)
            
            //handling unselection of term and definition
            unselectPair();
        }
        const handleMatchedOnDef=(arrayIndex)=>{
            //Handling matched
            //Updating definition
            let tempMatchedArrayDefs = isMatchedArrayDef;
            tempMatchedArrayDefs[arrayIndex]=true;
            setIsMatchedArrayDef(tempMatchedArrayDefs);
            //Updating term
            let tempMatchedArrayTerms = isMatchedArrayTerm;
            tempMatchedArrayTerms[currentTermSelected]=true;
            setIsMatchedArrayTerm(tempMatchedArrayTerms);
            console.log("Def matched at: "+arrayIndex)
            
            //handling unselection of term and definition
            unselectPair();
        }
    
        const handleTermClick=(arrayIndex)=>{
            if(isMatchedArrayTerm[arrayIndex])return;
            if(currentDefSelected!==-1&&this.state.termsList[arrayIndex][1]===this.state.defList[currentDefSelected][1]){
                handleMatchedOnTerm(arrayIndex);
            }
            else if(!isMatchedArrayTerm[arrayIndex]){
                //True if term was already selected
                let alreadySelected = currentTermSelected===arrayIndex;
                //Resets array to deselect previous term
                let tempSelectedArray = Array.from({ length: this.state.termsList.length }).fill(false);
                //Sets current term
                tempSelectedArray[arrayIndex] = !alreadySelected;
                setTermSelectedArray(tempSelectedArray);
                //If term already selected, it will be deselected
                if(alreadySelected)setCurrentTermSelected(-1);
                else setCurrentTermSelected(arrayIndex);
            }
        }
        
        const handleDefClick=(arrayIndex)=>{
            if(isMatchedArrayDef[arrayIndex])return;
            if(currentTermSelected!==-1&&this.state.defList[arrayIndex][1]===this.state.termsList[currentTermSelected][1]){
                handleMatchedOnDef(arrayIndex);
            }
            else if(!isMatchedArrayDef[arrayIndex]){
                //True if definition was already selected
                let alreadySelected = currentDefSelected===arrayIndex;
                //Resets array to deselect previous definition
                let tempSelectedArray = Array.from({ length: this.state.termsList.length }).fill(false);
                //Sets current definition
                tempSelectedArray[arrayIndex] = !alreadySelected;
                setDefSelectedArray(tempSelectedArray);
                //If definition already selected, it will be deselected
                if(alreadySelected)setCurrentDefSelected(-1);
                else setCurrentDefSelected(arrayIndex);
            }
        }
        const getMatchingTermClassName=(index)=>{
            if(isMatchedArrayTerm[index]){
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
            if(isMatchedArrayDef[index]){
                return "matchingMatchedPair";
            }
            else if(defSelectedArray[index]){
                return "matchingSelected";
            }
            else{
                return "matchingUnselected";
            }
        }
        return(
            <>
                <div className="column">
                    {this.state.termsList.map((term, index) => (
                        <div
                        key={index}
                        className={getMatchingTermClassName(index)}
                        onClick={()=>handleTermClick(index)}
                        >
                            {term[0]}
                        </div>
                    ))}
                </div>
                <div className="column">
                    {this.state.defList.map((def, index) => (
                        <div
                        key={index}
                        className={getMatchingDefClassName(index)}
                        onClick={()=>handleDefClick(index)}
                        >
                            {def[0]}
                        </div>
                    ))}
                </div>
            </>
        )
    }
}




function Matching(){
    const numberOfPairs = 5;
    const [isMatchedArrayTerm,setIsMatchedArrayTerm] = useState(Array.from({ length: numberOfPairs }).fill(false));
    const [isMatchedArrayDef,setIsMatchedArrayDef] = useState(Array.from({ length: numberOfPairs }).fill(false));
    const [termSelectedArray,setTermSelectedArray] = useState(Array.from({ length: numberOfPairs }).fill(false));
    const [defSelectedArray,setDefSelectedArray] = useState(Array.from({ length: numberOfPairs }).fill(false));
    const [currentTermSelected,setCurrentTermSelected] = useState(-1);
    const [currentDefSelected,setCurrentDefSelected] = useState(-1);
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

    return (
        <>
            <button id="back-button" style={{color:"white"}} onClick={()=>handleBackTolearn()}>Learn</button>
            <div id="MatchingContainingDiv">
                <h1 id="MatchingTitleHeader">Matching</h1>
                <div id="MatchingColumnsArea">
                    <MatchingClass isMatchedArrayTerm={isMatchedArrayTerm} isMatchedArrayDef={isMatchedArrayDef} setIsMatchedArrayTerm={setIsMatchedArrayTerm} setIsMatchedArrayDef={setIsMatchedArrayDef} termSelectedArray={termSelectedArray} setTermSelectedArray={setTermSelectedArray} defSelectedArray={defSelectedArray} setDefSelectedArray={setDefSelectedArray} currentTermSelected={currentTermSelected} setCurrentTermSelected={setCurrentTermSelected} currentDefSelected={currentDefSelected} setCurrentDefSelected={setCurrentDefSelected}/>
                </div>
            </div>
        </>
    )
}
export default Matching;
export {MatchingClass};
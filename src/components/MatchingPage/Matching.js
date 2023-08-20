import "./Matching.css";
import { React,useState,Component } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

class MatchingClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            initialTermList:[
                ["term1",0],
                ["term2",1],
                ["term3",2],
                ["term4",3],
                ["term5",4],
                ["term6",5],
                ["term7",6],
                ["term8",7],
                ["term9",8],
            ],
            initialDefsList:[
                ["def1",0],
                ["def2",1],
                ["def3",2],
                ["def4",3],
                ["def5",4],
                ["def6",5],
                ["def7",6],
                ["def8",7],
                ["def9",8],
            ],
            shuffledTermsList:[],
            shuffledDefsList:[],
            termsList:[],
            defsList:[],
            startIndex:0,
        }
    }
    componentDidMount() {
        this.initializeEverything();
        window.addEventListener('beforeunload', this.initializeEverything);
    }
    
    componentWillUnmount() {
        this.initializeEverything()
        window.removeEventListener('beforeunload', this.initializeEverything);
    }
    
    
    initializeEverything(){
        //Shuffle big array
        let tempSortedArr = this.shuffle2ArraysInSync(this.state.initialTermList,this.state.initialDefsList)
        this.setState({shuffledTermsList: tempSortedArr[0], shuffledDefsList: tempSortedArr[1]})
        //create shown array
        this.spawnShownArray(tempSortedArr,this.state.startIndex);
    }
    
    spawnShownArray(bigShuffledArr,actualStartIndex){
        this.setState({startIndex:actualStartIndex})
        let tempTermList = [];
        let tempDefList = [];
        for(let i = 0;i<bigShuffledArr[0].length&&i<this.props.numberOfPairs;i++){
            tempTermList[i] = bigShuffledArr[0][(i+actualStartIndex)%bigShuffledArr[0].length]
            tempDefList[i] = bigShuffledArr[1][(i+actualStartIndex)%bigShuffledArr[1].length]
        }
        this.setState({termsList: tempTermList,defsList: tempDefList});
        this.setState({termsList: this.shuffleArray(tempTermList), defsList: this.shuffleArray(tempDefList)})
    }
    
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    }
    shuffle2ArraysInSync(arr1,arr2) {
        for (let i = arr1.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
            [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
        }
        return [arr1,arr2]
    }

    render(){
        const {isMatchedArrayTerm,setIsMatchedArrayTerm,isMatchedArrayDef,setIsMatchedArrayDef,termSelectedArray,setTermSelectedArray,defSelectedArray,setDefSelectedArray,currentTermSelected,setCurrentTermSelected,currentDefSelected,setCurrentDefSelected,numberOfPairs} = this.props;
        
        const unselectPair=()=>{
            setTermSelectedArray(Array.from({ length: this.state.termsList }).fill(false));
            setDefSelectedArray(Array.from({ length: this.state.termsList }).fill(false));
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
    
        const listChoices={
            listOfTerms:0,
            listOfDefs:1,
        }
        const updateSelectionShown=(arrayIndex,newSelectState=true,listChoice)=>{
            //Resets array to deselect previous definition
            //Both lists should be equal length. If they are not, update this method to account for either list
            let tempSelectedArray = Array.from({ length: this.state.termsList }).fill(false);
            //Sets current definition
            tempSelectedArray[arrayIndex] = newSelectState;
            if(listChoice===listChoices.listOfTerms){
                setTermSelectedArray(tempSelectedArray);
                if(newSelectState){
                    setCurrentTermSelected(arrayIndex);
                    if(currentDefSelected!==-1){
                        setCurrentDefSelected(-1);
                        setDefSelectedArray(Array.from({ length: this.state.defsList }).fill(false))
                    }
                }
                else{
                    setCurrentTermSelected(-1);
                }
            }
            else{
                setDefSelectedArray(tempSelectedArray);
                if(newSelectState){
                    setCurrentDefSelected(arrayIndex);
                    if(currentTermSelected!==-1){
                        setCurrentTermSelected(-1);
                        setTermSelectedArray(Array.from({ length: this.state.termList }).fill(false))
                    }
                }
                else{
                    setCurrentDefSelected(-1);
                    
                }
            }

        }

        const handleTermClick=(arrayIndex)=>{
            if(isMatchedArrayTerm[arrayIndex])return;
            if(currentDefSelected!==-1&&this.state.termsList[arrayIndex][1]===this.state.defsList[currentDefSelected][1]){
                handleMatchedOnTerm(arrayIndex);
            }
            else if(!isMatchedArrayTerm[arrayIndex]){
                updateSelectionShown(arrayIndex,currentTermSelected!==arrayIndex,listChoices.listOfTerms);
            }
        }

        const handleDefClick=(arrayIndex)=>{
            if(isMatchedArrayDef[arrayIndex])return;
            if(currentTermSelected!==-1&&this.state.defsList[arrayIndex][1]===this.state.termsList[currentTermSelected][1]){
                handleMatchedOnDef(arrayIndex);
            }
            else if(!isMatchedArrayDef[arrayIndex]){
                updateSelectionShown(arrayIndex,currentDefSelected!==arrayIndex,listChoices.listOfDefs);
            }
        }
        const resetMatching = () =>{
            unsetAttributes();
            this.initializeEverything();
        }
        const unsetAttributes = ()=>{
            setIsMatchedArrayTerm(Array.from({ length: isMatchedArrayTerm }).fill(false))
            setIsMatchedArrayDef(Array.from({ length: isMatchedArrayDef }).fill(false))
            setTermSelectedArray(Array.from({ length: termSelectedArray }).fill(false))
            setDefSelectedArray(Array.from({ length: defSelectedArray }).fill(false))
            setCurrentTermSelected(-1);
            setCurrentDefSelected(-1);
        }

        const handleMatchingNextClicked=()=>{
            unsetAttributes()
            let tempStartIndex = (this.state.startIndex+1)%this.props.numberOfPairs;
            this.spawnShownArray([this.state.shuffledTermsList,this.state.shuffledDefsList],tempStartIndex);
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
                <button id="MatchingResetBtn" onClick={()=>resetMatching()}><i className="fa-solid fa-arrows-rotate"></i></button>
                <button id="MatchingNextBtn" onClick={()=>handleMatchingNextClicked()}>Next</button>
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
                    {this.state.defsList.map((def, index) => (
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
                    <MatchingClass isMatchedArrayTerm={isMatchedArrayTerm} isMatchedArrayDef={isMatchedArrayDef} setIsMatchedArrayTerm={setIsMatchedArrayTerm} setIsMatchedArrayDef={setIsMatchedArrayDef} termSelectedArray={termSelectedArray} setTermSelectedArray={setTermSelectedArray} defSelectedArray={defSelectedArray} setDefSelectedArray={setDefSelectedArray} currentTermSelected={currentTermSelected} setCurrentTermSelected={setCurrentTermSelected} currentDefSelected={currentDefSelected} setCurrentDefSelected={setCurrentDefSelected} numberOfPairs={numberOfPairs}/>
                </div>
            </div>
        </>
    )
}
export default Matching;
export {MatchingClass};
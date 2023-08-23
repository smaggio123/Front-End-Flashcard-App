import "./Matching.css";
import { React,useState,Component } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import MatchingSettingsPage from "./MatchingSettingsPage";

function Matching(){
    const [numberOfPairs,setNumberOfPairs] = useState(5);
    const [nextStepSize,setNextStepSize] = useState(numberOfPairs);
    const [isSettingsShowing,setIsSettingsShowing] = useState(false);
    const [numberOfPairsInput,setNumberOfPairsInput] = useState(1);
    const [isMatchedArrayTerm,setIsMatchedArrayTerm] = useState(Array.from({length: numberOfPairs}).fill(false));
    const [isMatchedArrayDef,setIsMatchedArrayDef] = useState(Array.from({length:numberOfPairs}).fill(false));
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
            <button id="MatchingOptionsButton" onClick={()=>setIsSettingsShowing(!isSettingsShowing)}>{isSettingsShowing? "Hide settings":"Show\nsettings"}</button>
            <div id="MatchingContainingDiv">
                <h1 id="MatchingTitleHeader">Matching</h1>
                <MatchingClass isSettingsShowing={isSettingsShowing} setIsSettingsShowing={setIsSettingsShowing} numberOfPairsInput={numberOfPairsInput} setNumberOfPairsInput={setNumberOfPairsInput} nextStepSize={nextStepSize} setNextStepSize={setNextStepSize} isMatchedArrayTerm={isMatchedArrayTerm} isMatchedArrayDef={isMatchedArrayDef} setIsMatchedArrayTerm={setIsMatchedArrayTerm} setIsMatchedArrayDef={setIsMatchedArrayDef} termSelectedArray={termSelectedArray} setTermSelectedArray={setTermSelectedArray} defSelectedArray={defSelectedArray} setDefSelectedArray={setDefSelectedArray} currentTermSelected={currentTermSelected} setCurrentTermSelected={setCurrentTermSelected} currentDefSelected={currentDefSelected} setCurrentDefSelected={setCurrentDefSelected} numberOfPairs={numberOfPairs} setNumberOfPairs={setNumberOfPairs}/>
            </div>
        </>
    )
}

class MatchingClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            initialTermList:[
                ["Diffusion",0],
                ["Osmosis",1],
                ["Active Transport",2],
                ["Facilitated Diffusion",3],
                ["Isotonic Solution",4],
                ["Hypertonic Solution",5],
                ["Plasmolyse",6],
                ["Hypotonic Solution",7],
                ["Turgid",8],
                ["Exocytosis",9],
                ["Endocytosis",10],
            ],
            initialDefsList:[
                ["The passive movement of particles from an area of high concentration to low concentration. This happens along a concentration gradient",0],
                ["A passive movement of water molecules through a semi permeable membrane. Water moves from an area of low solute concentration to high solute concentration",1],
                ["An active movement where an input of energy is required. Particles move from low concentration to high concentration",2],
                ["A passive movement of particles from high to low concentration through a protein channel in a cell.",3],
                ["The same concentration of dissolved substances. Water in = water out.",4],
                ["Higher concentration of solutes outside cell than inside",5],
                ["When a cell has shrunk",6],
                ["A cell has more solute inside than outside.",7],
                ["Cell may explode under pressure due to a hypotonic solution.",8],
                ["Movement out of a cell",9],
                ["Movement into a cell",10],
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
        const {isSettingsShowing,setIsSettingsShowing,nextStepSize,setNextStepSize,isMatchedArrayTerm,setIsMatchedArrayTerm,isMatchedArrayDef,setIsMatchedArrayDef,termSelectedArray,setTermSelectedArray,defSelectedArray,setDefSelectedArray,currentTermSelected,setCurrentTermSelected,currentDefSelected,setCurrentDefSelected,numberOfPairs,setNumberOfPairs} = this.props;
        
        const fullReset=(nPairsI,nNewTermsI)=>{
            setNumberOfPairs(nPairsI);
            setNextStepSize(nNewTermsI);
            this.setState({startIndex:0})
            let tempTermList = [];
            let tempDefList = [];
            for(let i = 0;i<this.state.shuffledTermsList.length&&i<nPairsI;i++){
                tempTermList[i] = this.state.shuffledTermsList[i]
                tempDefList[i] = this.state.shuffledDefsList[i]
            }
            this.setState({termsList: tempTermList,defsList: tempDefList});
            this.setState({termsList: shuffleArray(tempTermList), defsList: shuffleArray(tempDefList)})
        }
        const shuffleArray=(arr)=>{
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr
        }
        const shuffle2ArraysInSync=(arr1,arr2)=>{
            for (let i = arr1.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr1[i], arr1[j]] = [arr1[j], arr1[i]];
                [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
            }
            return [arr1,arr2]
        }

        const unselectPair=()=>{
            setTermSelectedArray(Array.from({ length: numberOfPairs }).fill(false));
            setDefSelectedArray(Array.from({ length: numberOfPairs }).fill(false));
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
            //Check that all pairs are matched
            checkAllSolved();
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
            //Check that all pairs are matched
            checkAllSolved();
        }
        const checkAllSolved=()=>{
            for(let i = 0;i<numberOfPairs;i++){
                if(isMatchedArrayDef[i]===false||isMatchedArrayTerm[i]===false){
                    return
                }
            }
            //Generate next set when all the matching is solved
            handleMatchingNextClicked(nextStepSize)
        }
    
        const listChoices={
            listOfTerms:0,
            listOfDefs:1,
        }
        const updateSelectionShown=(arrayIndex,newSelectState=true,listChoice)=>{
            //Resets array to deselect previous definition
            //Both lists should be equal length. If they are not, update this method to account for either list
            let tempSelectedArray = Array.from({ length: numberOfPairs }).fill(false);
            //Sets current definition
            tempSelectedArray[arrayIndex] = newSelectState;
            if(listChoice===listChoices.listOfTerms){
                setTermSelectedArray(tempSelectedArray);
                if(newSelectState){
                    setCurrentTermSelected(arrayIndex);
                    if(currentDefSelected!==-1){
                        setCurrentDefSelected(-1);
                        setDefSelectedArray(Array.from({ length: numberOfPairs }).fill(false))
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
                        setTermSelectedArray(Array.from({ length: numberOfPairs }).fill(false))
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
        const unsetAttributes = ()=>{
            setIsMatchedArrayTerm(Array.from({length: numberOfPairs}).fill(false))
            setIsMatchedArrayDef(Array.from({length: numberOfPairs}).fill(false))
            setTermSelectedArray(Array.from({ length: numberOfPairs }).fill(false))
            setDefSelectedArray(Array.from({ length: numberOfPairs }).fill(false))
            setCurrentTermSelected(-1);
            setCurrentDefSelected(-1);
        }

        const handleMatchingNextClicked=(jump)=>{
            unsetAttributes()
            let tempStartIndex = (this.state.startIndex+jump)%this.state.initialTermList.length;
            this.spawnShownArray([this.state.shuffledTermsList,this.state.shuffledDefsList],tempStartIndex);
            setIsSettingsShowing(false)
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
            {isSettingsShowing?
            <MatchingSettingsPage fullReset={fullReset} shuffle2ArraysInSync={shuffle2ArraysInSync} shuffleArray={shuffleArray} isSettingsShowing={isSettingsShowing} setIsSettingsShowing={setIsSettingsShowing} nextStepSize={nextStepSize} setNextStepSize={setNextStepSize} numberOfPairs={numberOfPairs} setNumberOfPairs={setNumberOfPairs}/>

            :
                <div id="MatchingColumnsArea">
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
                </div>
            }
            </>
        )
    }
}

export default Matching;
export {MatchingClass};
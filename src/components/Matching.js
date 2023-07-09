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
        let isMatchedArray=(Array.from({ length: this.state.termsList.length }).fill(false));
        let termSelectedArray=(Array.from({ length: this.state.termsList.length }).fill(false));
        let defSelectedArray= (Array.from({ length: this.state.termsList.length }).fill(false));
        let currentTermSelected=(-1);
        let currentDefSelected=(-1);
        
        
        const unselectPair=()=>{
            termSelectedArray = (Array.from({ length: this.state.termsList.length }).fill(false));
            defSelectedArray = (Array.from({ length: this.state.termsList.length }).fill(false));
            currentTermSelected = (-1);
            currentDefSelected = (-1);
        }
    
        const handleTermClick=(arrayIndex)=>{
            console.log(arrayIndex)
            if(isMatchedArray[arrayIndex])return;
            if(currentDefSelected!==-1&&arrayIndex===currentDefSelected){
                //Handling matched
                let tempMatchedArray = isMatchedArray;
                tempMatchedArray[arrayIndex]=true;
                isMatchedArray=(tempMatchedArray)
                console.log("Matched at: "+arrayIndex)
                //handling unselection of term and definition
                unselectPair();
            }
            else if(!isMatchedArray[arrayIndex]){
                //True if term was already selected
                let alreadySelected = currentTermSelected===arrayIndex;
                //Resets array to deselect previous term
                let tempSelectedArray = Array.from({ length: this.state.termsList.length }).fill(false);
                //Sets current term
                tempSelectedArray[arrayIndex] = !alreadySelected;
                termSelectedArray=(tempSelectedArray);
                //If term already selected, it will be deselected
                if(alreadySelected)currentTermSelected=(-1);
                else currentTermSelected=(arrayIndex);
            }
        }
        
        const handleDefClick=(arrayIndex)=>{
            if(isMatchedArray[arrayIndex])return;
            if(currentTermSelected!==-1&&arrayIndex===currentTermSelected){
                //Handling matched
                let tempMatchedArray = isMatchedArray;
                tempMatchedArray[arrayIndex]=true;
                isMatchedArray=(tempMatchedArray)
                console.log("Matched at: "+arrayIndex)
                
                //handling unselection of term and definition
                unselectPair();
            }
            else if(!isMatchedArray[arrayIndex]){
                //True if definition was already selected
                let alreadySelected = currentDefSelected===arrayIndex;
                //Resets array to deselect previous definition
                let tempSelectedArray = Array.from({ length: this.state.termsList.length }).fill(false);
                //Sets current definition
                tempSelectedArray[arrayIndex] = !alreadySelected;
                defSelectedArray=(tempSelectedArray);
                //If definition already selected, it will be deselected
                if(alreadySelected)currentDefSelected=(-1);
                else currentDefSelected=(arrayIndex);
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
        return(
            <>
                <div className="column">
                    {this.state.termsList.map((term, index) => (
                        <div
                        key={index}
                        className={getMatchingTermClassName(index)}
                        onClick={()=>handleTermClick(term[1])}
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
                        onClick={()=>handleDefClick(def[1])}
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
        // Fisher-Yates shuffle algorithm
        //Shuffles the list of terms and definitions
        const shuffleArray = (arr) => {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };
        // This code will run after the component has rendered
        // Perform your desired actions here, such as fetching data or manipulating the DOM
        if (document.readyState === 'complete') {
            let dl = defList;
          
            setDefList(shuffleArray(dl));
          }
          else {
            let dl = defList;
            window.addEventListener('load', setDefList(shuffleArray(dl)));
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', setDefList(shuffleArray(dl)));
          }
    }, []); // Empty dependency array ensures that the effect runs only once (similar to componentDidMount)

    

    const unselectPair=()=>{
        setTermSelectedArray(Array.from({ length: termsList.length }).fill(false));
        setDefSelectedArray(Array.from({ length: termsList.length }).fill(false));
        setCurrentTermSelected(-1);
        setCurrentDefSelected(-1);
    }

    const handleTermClick = (arrayIndex) => {
        if(isMatchedArray[arrayIndex])return;
        if(currentDefSelected!==-1&&arrayIndex===currentDefSelected){
            //Handling matched
            let tempMatchedArray = isMatchedArray;
            tempMatchedArray[arrayIndex]=true;
            setIsMatchedArray(tempMatchedArray)
            console.log("Matched at: "+arrayIndex)
            //handling unselection of term and definition
            unselectPair();
        }
        else if(!isMatchedArray[arrayIndex]){
            //True if term was already selected
            let alreadySelected = currentTermSelected===arrayIndex;
            //Resets array to deselect previous term
            let tempSelectedArray = Array.from({ length: termsList.length }).fill(false);
            //Sets current term
            tempSelectedArray[arrayIndex] = !alreadySelected;
            setTermSelectedArray(tempSelectedArray);
            //If term already selected, it will be deselected
            if(alreadySelected)setCurrentTermSelected(-1);
            else setCurrentTermSelected(arrayIndex);
        }
    }
    
    const handleDefClick = (arrayIndex) => {
        if(isMatchedArray[arrayIndex])return;
        if(currentTermSelected!==-1&&arrayIndex===currentTermSelected){
            //Handling matched
            let tempMatchedArray = isMatchedArray;
            tempMatchedArray[arrayIndex]=true;
            setIsMatchedArray(tempMatchedArray)
            console.log("Matched at: "+arrayIndex)
            
            //handling unselection of term and definition
            unselectPair();
        }
        else if(!isMatchedArray[arrayIndex]){
            //True if definition was already selected
            let alreadySelected = currentDefSelected===arrayIndex;
            //Resets array to deselect previous definition
            let tempSelectedArray = Array.from({ length: termsList.length }).fill(false);
            //Sets current definition
            tempSelectedArray[arrayIndex] = !alreadySelected;
            setDefSelectedArray(tempSelectedArray);
            //If definition already selected, it will be deselected
            if(alreadySelected)setCurrentDefSelected(-1);
            else setCurrentDefSelected(arrayIndex);
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
                    
                    <MatchingClass/>
                    {/* <div className="column">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Matching;
export {MatchingClass};


/*
export {AllDefinitions}
class AllDefinitions extends Component {
    constructor(props) {
        super(props);
        this.state = {
          myList: [
              ["def1",0],
              ["def2",1],
              ["def3",2],
              ["def4",3],
              ["def5",4],
          ]
      };
    }
    getMatchingDefClassName(index){
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

  
    componentDidMount() {
      this.shuffleArray();
      window.addEventListener('beforeunload', this.shuffleArray);
    }
  
    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.shuffleArray);
    }
  
    shuffleArray = () => {
      const { myList } = this.state;
      const shuffledNumbers = [...myList];
      for (let i = shuffledNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
      }
      this.setState({ myList: shuffledNumbers });
    };
  
    render() {
      const { myList } = this.state;
      return(
        <>
            <div className="column">
                        {myList.map((def, index) => (
                        <div
                        key={index}
                        className={getMatchingDefClassName(index)}
                        onClick={() => handleDefClick(def[1])}
                        >
                            {def[0]}
                        </div>
                        ))}
                    </div>
        </>
      )
    }
  }
  */
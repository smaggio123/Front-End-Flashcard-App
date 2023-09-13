class ListOfPairs{
    #listOfPairs=[];
    #currentIndex=0;
    #set
    constructor(s){
        this.#listOfPairs = s.getListOfData();
        this.#set = s
    }
    getList(){
        return this.#listOfPairs;
    }
    setList(l){
        this.#listOfPairs = l;
    }
    getSet(){
        return this.#set;
    }
    setSet(s){
        this.#set=s;
    }
    getListLength(){
        return this.#listOfPairs.length;
    }
    getCurrentTerm(){
        return this.#listOfPairs[this.#currentIndex].getTerm();
    }
    getCurrentDef(){
        return this.#listOfPairs[this.#currentIndex].getDef();
    }
    getCurrentIndex(){
        return this.#currentIndex;
    }
    setCurrentIndex(i){
        this.#currentIndex = i;
    }
    addPair(p){
        this.#listOfPairs.push(p)
    }
}
export default ListOfPairs;
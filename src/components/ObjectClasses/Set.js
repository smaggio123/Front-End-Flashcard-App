class MySet{
    #setId
    #folderId
    #userId
    #listOfPairs=[];
    #currentIndex=0;
    constructor(LOP,s,f,u){
        this.#listOfPairs = LOP;
        this.#setId = s;
        this.#folderId = f;
        this.#userId = u;
    }
    getSetId(){
        return this.#setId;
    }
    setSetId(s){
        this.#setId = s;
    }
    getFolderId(){
        return this.#folderId;
    }
    setFolderId(f){
        this.#folderId = f;
    }
    getUserId(){
        return this.#userId;
    }
    setUserId(u){
        this.#userId = u;
    }
    getListOfPairs(){
        return this.#listOfPairs;
    }
    setListOfPairs(l){
        this.#listOfPairs = l;
    }
    getListOfPairsLength(){
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
export default MySet;
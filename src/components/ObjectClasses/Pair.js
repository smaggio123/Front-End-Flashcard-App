class MyPair{
    #index
    #pairId
    #term='';
    #def='';
    #setId
    #folderId
    #userId
    constructor(i,p,t,d){
        this.#index = i;
        this.#pairId = p;
        this.#term = t;
        this.#def = d;
    }
    getIndex(){
        return this.#index;
    }
    setIndex(i){
        this.#index = i;
    }
    getPairId(){
        return this.#pairId;
    }
    setPairId(p){
        this.#pairId = p;
    }
    getTerm(){
        return this.#term;
    }
    setTerm(t){
        this.#term = t;
    }
    getDef(){
        return this.#def;
    }
    setDef(d){
        this.#def = d;
    }
}
export default MyPair;
class MyPair{
    #pairId
    #term='';
    #def='';
    #setId
    #folderId
    #userId
    constructor(p,t,d){
        this.#pairId = p;
        this.#term = t;
        this.#def = d;
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
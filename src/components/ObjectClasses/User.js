class MyUser{
    #userId
    #username='';
    #password='';
    constructor(i,u,p){
        this.#userId = i;
        this.#username = u;
        this.#password = p;
    }

    getUserId(){
        return this.#userId;
    }
    setUserId(i){
        this.#userId = i;
    }
    getUsername(){
        return this.#username;
    }
    setUsername(u){
        this.#username = u;
    }
    getPassword(){
        return this.#password;
    }
    setPassword(p){
        this.#password = p;
    }
}
export default MyUser
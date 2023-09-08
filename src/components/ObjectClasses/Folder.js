class MyFolder{
    #folderId
    #folderName = '';
    #userId
    constructor(fId,fN,u){
        this.#folderId = fId;
        this.#folderName = fN;
        this.#userId = u;
    }
    getFolderName(){
        return this.#folderName;
    }
    setFolderName(fN){
        this.#folderName = fN;
    }
    getFolderId(){
        return this.#folderId;
    }
    setFolderId(fId){
        this.#folderId = fId;
    }
    getUserId(){
        return this.#userId;
    }
    setUserId(u){
        this.#userId = u;
    }
}
export default MyFolder
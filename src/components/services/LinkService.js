import axios from 'axios'

const LINKS_REST_API_URL = 'http://localhost:8080/api/links'

class LinkService{
    getLinks(){
        return axios.get(LINKS_REST_API_URL);
    }
}

export default new LinkService()
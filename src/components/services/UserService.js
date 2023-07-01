import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:8080/api/users/'

class UserService{
    static async createUser(user) {
        try {
            const response = await axios.post(USERS_REST_API_URL, user);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getUser(id) {
        try {
            const response = await axios.get(USERS_REST_API_URL+"user/"+id);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getUserByUsername(username) {
        try {
            const response = await axios.get(USERS_REST_API_URL+"username/"+username);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateUser(id,user) {
        try {
            const response = await axios.put(USERS_REST_API_URL+id,user);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async deleteUser(id) {
        try {
            const response = await axios.delete(USERS_REST_API_URL+id);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default UserService//{ createUser, getUser,updateUser,deleteUser };
// export default new UserService()
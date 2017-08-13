import axios from "axios";

export function findUserByEmail(email) {
    const request = axios.get(`http://localhost:3000/api/users/${email}`); 
    return {
        type: "FIND_USER_BY_EMAIL",
        payload: request
    }
}
export function createUser(data) {
    const request = axios.post(`http://localhost:3000/api/users`, data); 
    return {
        type: "CREATE_USER",
        payload: request
    }
}

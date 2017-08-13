import axios from "axios";

export function getTags() {
    const request = axios.get(`http://localhost:3000/api/tags`); 
    return {
        type: "GET_TAGS",
        payload: request
    }
} 

export function deleteTag(id){
	const request = axios.delete(`http://localhost:3000/api/tags/${id}`);
	return {
		type: "DELETE_TAG",
		payload: request
	} 
}

export function createTag(data) {
    const request = axios.post(`http://localhost:3000/api/tags/create`, data);
    return {
        type: "CREATE_TAG",
        payload: request
    } 
}

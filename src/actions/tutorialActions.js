import axios from "axios";

export function getTutorials() {
    const request = axios.get(`api/tutorials`); 
    return {
        type: "GET_TUTORIALS",
        payload: request
    }
}

export function deleteTutorial(id){
	const request = axios.delete(`api/tutorials/${id}`);
	return {
		type: "DELETE_TUTORIAL",
		payload: request
	}
}

export function createTutorial(data) {
    const request = axios.post(`api/tutorials/create`, data);
    return {
        type: "CREATE_TUTORIAL",
        payload: request
    }
}

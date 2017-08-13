import axios from "axios";

export function getTimeline() {
    const request = axios.get(`http://localhost:3000/api/timelines`); 
    return {
        type: "GET_TIMELINE",
        payload: request
    }
} 

export function deleteTimeline(id){
	const request = axios.delete(`http://localhost:3000/api/timelines/${id}`);
	return {
		type: "DELETE_TIMELINE",
		payload: request
	} 
}

export function createTimeline(data) {
    const request = axios.post(`http://localhost:3000/api/timelines`, data);
    return {
        type: "CREATE_TIMELINE",
        payload: request
    } 
}

export function updateTimeline(data) {
    const timelineId = data.id;
    delete data.id;
    const request = axios.patch(`http://localhost:3000/api/timelines/${timelineId}`, data);
    return {
        type: "UPDATE_TIMELINE",
        payload: request
    } 
}

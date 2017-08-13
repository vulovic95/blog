import axios from "axios";


export function logUserData(user){
	return {
		type: "SIGNED_IN",
		payload: user
	}
}

export function getAuthenticatedUsers(data) {
  const request = axios.get(`http://localhost:3000/api/authentications`); 
  return {
      type: "GET_AUTHENTICATED_USERS",
      payload: request
  }
}
export function createAuthenticatedUser(data) {
  const request = axios.post(`http://localhost:3000/api/authentications`, data); 
  return {
      type: "CREATE_AUTHENTICATED_USER",
      payload: request
  }
}
export function deleteAuthenticatedUser(authenticatedId) {
    const request = axios.delete(`http://localhost:3000/api/authentications/${authenticatedId}`);
    return {
        type: "DELETE_AUTHENTICATED_USER",
        payload: request
    }
}
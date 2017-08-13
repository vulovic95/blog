const userReducer = (state = {
	users: [],
	user: { date:"", email:"", password:"", username:"",_id:"" }, 
	error: null
}, action) => {
	switch(action.type){
		case "FIND_USER_BY_USERNAME_AND_PASSWORD":
			state = {	...state } 
			break;
		case "FIND_USER_BY_USERNAME_AND_PASSWORD_FULFILLED":
			state = {	...state, user: action.payload.data	} 
			break;
		case "FIND_USER_BY_USERNAME_AND_PASSWORD_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "FIND_USER_BY_ID":
			state = {	...state } 
			break;
		case "FIND_USER_BY_ID_FULFILLED":
			state = {	...state, user: action.payload.data	} 
			break;
		case "FIND_USER_BY_ID_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "CREATE_USER":
			state = { ...state }
			break;
		case "CREATE_USER_FULFILLED":
			state = { ...state, users:[...state.users, action.payload.data] }
			break;
		case "CREATE_USER_REJECTED":
			state = { ...state, error: action.payload }
			break;			
		default: break;
	}
	return state;
}
export default userReducer;
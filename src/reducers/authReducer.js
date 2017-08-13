const authReducer = (state = {
	user: null,
	authenticatedEmails:[]
}, action) => {
	switch(action.type){
		case "SIGNED_IN":
			state = {	...state, user: action.payload	} 
			break;
		case "GET_AUTHENTICATED_USERS":
			state = {...state}	
			break;
		case "GET_AUTHENTICATED_USERS_FULFILLED":
			state = {	...state, authenticatedEmails: action.payload.data	} 
			break;
		case "GET_AUTHENTICATED_USERS_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;	
		case "CREATE_AUTHENTICATED_USER":
			state = {...state}	
			break;
		case "CREATE_AUTHENTICATED_USER_FULFILLED":
			state = {	...state, authenticatedEmails: [...state.authenticatedEmails, action.payload.data]	} 
			break;
		case "CREATE_AUTHENTICATED_USER_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;	
		case "DELETE_AUTHENTICATED_USER":
			state = { ...state }	
			break;		
		case "DELETE_AUTHENTICATED_USER_FULFILLED": 
			state = {...state, authenticatedEmails: state.authenticatedEmails.filter(authenticated =>  authenticated._id !== action.payload.data.id ) }; 
			break;
		case "DELETE_AUTHENTICATED_USER_REJECTED":
			state = { ...state, error:action.payload }
			break;		
		default: break;
	}
	return state;
} 

export default authReducer;
const tutorialReducer = (state = {
	tutorials:[],
	error:null
}, action) => {
	switch(action.type){
		case "GET_TUTORIALS":
			state = {	...state } 
			break; 
		case "GET_TUTORIALS_FULFILLED":
			state = {	...state, tutorials: action.payload.data	} 
			break;
		case "GET_TUTORIALS_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "CREATE_TUTORIAL":
			state = { ...state }
			break;
		case "CREATE_TUTORIAL_FULFILLED":
			state = { ...state, tutorials: [...state.tutorials, action.payload.data] } 
			break;
		case "CREATE_TUTORIAL_REJECTED":
			state = { ...state, error:action.payload } 
			break;
		case "DELETE_TUTORIAL":
			state = { ...state }	
			break;		
		case "DELETE_TUTORIAL_FULFILLED": 
			return { tutorials: state.tutorials.filter(tutorial =>  tutorial._id !== action.payload.data.id )}; 
			break;
		case "DELETE_TUTORIAL_REJECTED":
			state = { ...state, error:action.payload }
			break;
		default: break;
		
	}
	return state;
}
export default tutorialReducer;
const tagReducer = (state = {
	tags:[],
	error:null
}, action) => {
	switch(action.type){
		case "GET_TAGS":
			state = {	...state } 
			break; 
		case "GET_TAGS_FULFILLED":
			state = {	...state, tags: action.payload.data	} 
			break;
		case "GET_TAGS_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "CREATE_TAG":
			state = { ...state }
			break;
		case "CREATE_TAG_FULFILLED":
			state = { ...state, tags: [...state.tags, action.payload.data] } 
			break;
		case "CREATE_TAG_REJECTED":
			state = { ...state, error:action.payload } 
			break;
		case "DELETE_TAG":
			state = { ...state }	
			break;		
		case "DELETE_TAG_FULFILLED": 
			return { tags: state.tags.filter(tag =>  tag._id !== action.payload.data.id )}; 
			break;
		case "DELETE_TAG_REJECTED":
			state = { ...state, error:action.payload }
			break;
		default: break;
		
	}
	return state;
}
export default tagReducer;
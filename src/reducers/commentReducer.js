const commentReducer = (state = {
	comments:[],
	comment:{},
	error:null
}, action) => {
	switch(action.type){
		case "GET_COMMENTS_BY_POST_ID":
			state = {	...state } 
			break; 
		case "GET_COMMENTS_BY_POST_ID_FULFILLED":
			state = {	...state, comments: action.payload.data	} 
			break;
		case "GET_COMMENTS_BY_POST_ID_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "ADD_COMMENT":
			state = { ...state }
			break;
		case "ADD_COMMENT_FULFILLED":
			state = { ...state, comments: [...state.comments, action.payload.data] } 
			break;
		case "ADD_COMMENT_REJECTED":
			state = { ...state, error:action.payload } 
			break;
		case "DELETE_COMMENT":
			state = { ...state }	
			break;		
		case "DELETE_COMMENT_FULFILLED": 
			return { comments: state.comments.filter(comment =>  comment._id !== action.payload.data.id ) }; 
			break;
		case "DELETE_COMMENT_REJECTED":
			state = { ...state, error:action.payload }
			break;			
		default: break;
	}
	return state;
}
export default commentReducer;
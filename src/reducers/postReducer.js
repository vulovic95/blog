const postReducer = (state = {
	post:{ postId: "", id: "", tags: [], title: "", description: "", photo:"", author:"", comments:[], tutorials:[]	},
	posts:[],
	tags:[],
	tutorials:[],
	error: null
}, action)=>{
	switch(action.type){ 
		case "GET_ALL_POSTS":
			state = {	...state }		
			break;
		case "GET_ALL_POSTS_FULFILLED":
			state = { ...state, posts:action.payload.data.reverse()}	
			break;
		case "GET_ALL_POSTS_REJECTED":
			state = { ...state, error:action.payload}	
			break;
		case "GET_POST_BY_ID":
			state = { ...state }
			break;
		case "GET_POST_BY_ID_FULFILLED":
			state = { ...state, post: action.payload.data}
			break;
		case "GET_POST_BY_ID_REJECTED":
			state = { ...state, error:action.payload}
			break;
		case "DELETE_POST":
			state = { ...state }	
			break;		
		case "DELETE_POST_FULFILLED": 
			state = {	...state,	  posts:state.posts.filter( post => post._id !== action.payload.data.id ) }
			break;
		case "DELETE_POST_REJECTED":
			state = { ...state, error:action.payload}
			break;
		case "ADD_POST":
			state = { ...state }
			break;
		case "ADD_POST_FULFILLED":
			state = { ...state, posts:[...state.posts, action.payload.data] }
			break;
		case "ADD_POST_REJECTED":
			state = { ...state, error:action.payload }
			break;
		case "UPDATE_POST":
			state = { ...state }
			break;
		case "UPDATE_POST_FULFILLED":
			state = {	 ...state, posts: state.posts.map(item=>  item.postId === action.payload.data.id ? {...item, title: action.payload.data.title, description: action.payload.data.description} : item )	}
			break;
		case "UPDATE_POST_REJECTED":
			state = { ...state, error: action.payload }
			break;
		case "GET_TAGS_BY_POST_ID":
			state = {	...state } 
			break; 
		case "GET_TAGS_BY_POST_ID_FULFILLED":			
			state = { ...state, tags: action.payload.data}
			break;
		case "GET_TAGS_BY_POST_ID_REJECTED": 	
			location.pathname="/NotFound";
			state = {	...state,	error: action.payload.data[0]	}
			break;		
		case "GET_TUTORIALS_BY_POST_ID":
			state = {	...state } 
			break; 
		case "GET_TUTORIALS_BY_POST_ID_FULFILLED":			
			state = { ...state, tutorials: action.payload.data}
			break;
		case "GET_TUTORIALS_BY_POST_ID_REJECTED": 	
			location.pathname="/NotFound";
			state = {	...state,	error: action.payload.data[0]	}
			break;
		default: break;		
	}
	return state;
}
export default postReducer;

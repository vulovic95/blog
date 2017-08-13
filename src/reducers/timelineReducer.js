const timelineReducer = (state = {
	timelines:[],
	error:null
}, action) => {
	switch(action.type){
		case "GET_TIMELINE":
			state = {	...state } 
			break; 
		case "GET_TIMELINE_FULFILLED":
			state = {	...state, timelines: action.payload.data	} 
			break;
		case "GET_TIMELINE_REJECTED": 	
			state = {	...state,	error: action.payload	}
			break;
		case "CREATE_TIMELINE":
			state = { ...state }
			break;
		case "CREATE_TIMELINE_FULFILLED":
			state = { ...state, timelines: [...state.timelines, action.payload.data] } 
			break;
		case "CREATE_TIMELINE_REJECTED":
			state = { ...state, error:action.payload } 
			break;
		case "DELETE_TIMELINE":
			state = { ...state }	
			break;		
		case "DELETE_TIMELINE_FULFILLED": 
			return { timelines: state.timelines.filter(tag =>  tag._id !== action.payload.data.id )}; 
			break;
		case "DELETE_TIMELINE_REJECTED":
			state = { ...state, error:action.payload }
			break;
		case "UPDATE_TIMELINE":
			state = { ...state }
			break;
		case "UPDATE_TIMELINE_FULFILLED":
			state = { ...state,	 timelines: state.timelines.map(item=>  item._id === action.payload.data.id ? {...item, text: action.payload.data.text, year: action.payload.data.year, singlePoint: action.payload.data.singlePoint, timelineType: action.payload.data.timelineType} : item )	}
			break;
		case "UPDATE_TIMELINE_REJECTED":
			state = { ...state, error: action.payload }
			break;	

		default: break;
		
	}
	return state;
}
export default timelineReducer;
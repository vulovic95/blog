const generalReducer = (state = { 
	onBlur: function (e) { 
		e.target.classList.remove("activeField"); 
    $("label[for="+e.target.name+"]").removeClass("activeLabel");
	},
	onFocus: function (e) { 
		e.target.classList.add("activeField"); 
    $("label[for="+e.target.name+"]").addClass("activeLabel");
	},
	paginate: function(array, pageSize, pageNumber) {
    --pageNumber;
    return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
  },
	style: {
		opacity:0.3,
		transition: "all 1s ease"
	},
	tutorialsPageNumber: 1,
	blogPageNumber: 1,
	pageSize: 10,
	search: "",
	searchTag: "",
	searchTutorial:""
	}, action) => {
	switch (action.type){
		case "SET_STYLE":
			state = {	...state,	style: action.payload	}
		break;
		case "UNSET_STYLE":
			state = {	...state,	style: action.payload	}
			break; 
		case "INCREMENT_PAGE": 
    	var pageToBePaginated = location.pathname.split("/").pop();
			if((pageToBePaginated=="blog" || pageToBePaginated=="administration") && state.blogPageNumber < action.payload.length / state.pageSize) 
					state = {	...state,	blogPageNumber: state.blogPageNumber + action.payload.for	}				
			if(pageToBePaginated=="tutorials" && state.tutorialsPageNumber < action.payload.length / state.pageSize) 
					state = {	...state,	tutorialsPageNumber: state.tutorialsPageNumber + action.payload.for	}		
			break;
		case "DECREMENT_PAGE": 
    	var pageToBePaginated = location.pathname.split("/").pop();
			if((pageToBePaginated=="blog" || pageToBePaginated=="administration") && state.blogPageNumber > 1) 
					state = {	...state,	blogPageNumber: state.blogPageNumber - action.payload	}		
			if(pageToBePaginated == "tutorials" && state.tutorialsPageNumber > 1) 
					state = {	...state,	tutorialsPageNumber: state.tutorialsPageNumber - action.payload	}
			break;
		case "START_PAGE":
			state = {...state, pageNumber: action.payload.start}
			break;
		case "SEARCH":
			state = { ...state, search: action.payload} 
			break;
		case "SEARCH_TAG":
			state = { ...state, searchTag: action.payload }
			break;	
		case "SEARCH_TUTORIAL":
			state = { ...state, searchTutorial: action.payload }
			break;	
		default: break;	
	}
	return state;
};
export default generalReducer;

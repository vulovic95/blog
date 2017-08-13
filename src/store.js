import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import generalReducer from "./reducers/generalReducer";
import authReducer from "./reducers/authReducer";
import postReducer from "./reducers/postReducer";
import commentReducer from "./reducers/commentReducer";
import tagReducer from "./reducers/tagReducer";
import timelineReducer from "./reducers/timelineReducer";
import tutorialReducer from "./reducers/tutorialReducer";
import thunk from "redux-thunk";
import axios from "axios";
import promise from "redux-promise-middleware";
import {firebaseApp} from "./firebase"; 

import {logUserData, getAuthenticatedUsers} from "./actions/authActions";
import {getAllPosts} from "./actions/postActions";
import {getTimeline} from "./actions/timelineActions";
import {getTags} from "./actions/tagActions";
import {getTutorials} from "./actions/tutorialActions";

const error = (store) => (next) => (action) =>{
	try{ next(action)	}
	catch(err){	console.log("Caught an exception: ",err)	}
}   

const store = createStore(combineReducers({generalReducer, authReducer, postReducer, commentReducer, tagReducer, timelineReducer, tutorialReducer}), {}, applyMiddleware(promise(),thunk, logger, error));

store.subscribe(()=>{});
firebaseApp.auth().onAuthStateChanged((user) => {
	store.dispatch(getAuthenticatedUsers());
	store.dispatch(getAllPosts());
	store.dispatch(getTimeline());
	store.dispatch(getTags());
	store.dispatch(getTutorials());
	if(user!=null){ 
		document.getElementById("buttonLogout").classList.remove("hide");				
		document.getElementById("buttonLogin").classList.add("hide"); 
		const {email} = user;
		store.dispatch(logUserData(user));
	}
	else{
		document.getElementById("buttonLogin").classList.remove("hide");
		document.getElementById("buttonLogout").classList.add("hide");		
	}
})
 
export default store;
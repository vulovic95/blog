import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Route, Switch, BrowserRouter} from "react-router-dom";
import { browserHistory } from 'react-router';

import {Home} from "../components/Home";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Menu} from "../components/Menu";
import {Main} from "../components/Main";
import {Tutorial} from "../components/Tutorial";
import {Filter} from "../components/Filter";
import {NotFound} from "../components/NotFound";
import {ShowPost} from "../components/ShowPost";

import {Administration} from "../components/Administration";
import {AddPost} from "../components/AddPost";
import {EditPost} from "../components/EditPost";
import {Content} from "../components/Content";

import {setStyle, unsetStyle, incrementPage, decrementPage, updateSearch, updateTagSearch, updateTutorialSearch} from "../actions/generalActions";
import {getAllPosts, getPostById, deletePost, updatePost, addPost, getTagsByPostId, getTutorialsByPostId} from "../actions/postActions";
import {addComment, getCommentsByPostId, deleteComment} from "../actions/commentActions";
import {getTags, createTag, deleteTag} from "../actions/tagActions";
import {createTimeline, deleteTimeline, updateTimeline} from "../actions/timelineActions";
import {getTutorials, createTutorial, deleteTutorial} from "../actions/tutorialActions";
import {getAuthenticatedUsers, createAuthenticatedUser, deleteAuthenticatedUser} from "../actions/authActions";



const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      if(rest.authenticate != null && rest.listOfAuthenticatedEmails!=null)
				return rest.listOfAuthenticatedEmails.includes(rest.authenticate) ? renderMergedProps(component, routeProps, rest) : <NotFound />;
      else
				return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends React.Component{
	render() {
		var loggedEmail = this.props.auth.user == null ? "" : this.props.auth.user.email;
		var authenticatedEmails=[];
		this.props.auth.authenticatedEmails.map(auth=>authenticatedEmails.push(auth.email));
  	return(
  		<BrowserRouter history={browserHistory}>
  			<div>
      	  <Menu user={this.props.auth.user} loggedEmail={loggedEmail} listOfAuthenticatedEmails={authenticatedEmails}/>
	  			<Header />
	  			<Switch>
	  				<PropsRoute exact path="/" component={Home}
	 	          style={this.props.general.style}
	  					setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
	 	          timeline={this.props.timeline.timelines}	/>

	          <PropsRoute exact path="/blog" component={Main}
	 	          style={this.props.general.style}
		          setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
		          onFocus={this.props.general.onFocus}
		          onBlur={this.props.general.onBlur}
	          	getTagsByPostId={this.props.getTagsByPostId}
		          tag={this.props.tag}
		          search={this.props.general.search}
		          updateSearch={this.props.updateSearch}
		          style={this.props.general.style}
		          getAllPosts={this.props.getAllPosts}
		          post={this.props.post}
		          paginate={this.props.general.paginate}
		          decrementPage={this.props.decrementPage}
		          incrementPage={this.props.incrementPage}
	          	pageSize={this.props.general.pageSize}
	          	pageNumber={this.props.general.blogPageNumber}
	          	tutorial={this.props.tutorial}
		          startPage={this.props.startPage} />

						<PropsRoute path={"/blog/posts/filter/:category/:id/:word"} component={Filter}
	 	          style={this.props.general.style}
	 	          unsetStyle={this.props.unsetStyle}
	 	          setStyle={this.props.setStyle}
	 	          posts={this.props.post.posts}
	 	          tags={this.props.tag.tags}
	 	          tutorials={this.props.tutorial.tutorials} />

		        <PropsRoute path={"/blog/posts/:id/:title"} component={ShowPost}
		          {...this.props.match}
		          style={this.props.general.style}
		          setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
		          onFocus={this.props.general.onFocus}
		          onBlur={this.props.general.onBlur}
		          getTagsByPostId={this.props.getTagsByPostId}
		          getPostById={this.props.getPostById}
		          post={this.props.post}
		          getCommentsByPostId={this.props.getCommentsByPostId}
		          addComment={this.props.addComment}
		          comment={this.props.comment}
		          deleteComment={this.props.deleteComment}
		          user={this.props.auth.user}
		          updatePost={this.props.updatePost}
		          email={loggedEmail}
		          listOfAuthenticatedEmails={authenticatedEmails} />

	 	         <PropsRoute path={"/tutorials"} component={Tutorial}
	 	          style={this.props.general.style}
	 	          unsetStyle={this.props.unsetStyle}
	 	          setStyle={this.props.setStyle}
	 	          post={this.props.post}
	 	          tutorial={this.props.tutorial}
	 	          paginate={this.props.general.paginate}
		          decrementPage={this.props.decrementPage}
		          incrementPage={this.props.incrementPage}
		          startPage={this.props.startPage}
	          	pageSize={this.props.general.pageSize}
	          	pageNumber={this.props.general.tutorialsPageNumber} />

						<PropsRoute exact path="/administration" component={Administration}
	 	          authenticate={loggedEmail}
	 	          listOfAuthenticatedEmails={authenticatedEmails}
		          style={this.props.general.style}
		          setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
		          post={this.props.post}
		          deletePost={this.props.deletePost}
		          email={loggedEmail}
		          paginate={this.props.general.paginate}
		          decrementPage={this.props.decrementPage}
		          incrementPage={this.props.incrementPage}
		          pageSize={this.props.general.pageSize}
		          pageNumber={this.props.general.blogPageNumber}
		          startPage={this.props.startPage} />

	         <PropsRoute path="/administration/content" component={Content}
	 	          authenticate={loggedEmail}
	 	          listOfAuthenticatedEmails={authenticatedEmails}
 	          	style={this.props.general.style}
		          setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
		          onFocus={this.props.general.onFocus}
		          onBlur={this.props.general.onBlur}
		          getTags={this.props.getTags}
		          createTag={this.props.createTag}
		          deleteTag={this.props.deleteTag}
 	          	tag={this.props.tag}
 	          	createTimeline={this.props.createTimeline}
 	          	deleteTimeline={this.props.deleteTimeline}
 	          	timeline={this.props.timeline.timelines}
 	          	updateTimeline={this.props.updateTimeline}
 	          	tutorial={this.props.tutorial}
 	          	createTutorial={this.props.createTutorial}
 	          	deleteTutorial={this.props.deleteTutorial}
 	          	authenticatedEmails={this.props.auth.authenticatedEmails}
 	          	createAuthenticatedUser={this.props.createAuthenticatedUser}
 	          	deleteAuthenticatedUser={this.props.deleteAuthenticatedUser} />

 	          <PropsRoute path="/administration/posts/create" component={AddPost}
	 	          authenticate={loggedEmail}
	 	          listOfAuthenticatedEmails={authenticatedEmails}
	 	          style={this.props.general.style}
	 	          setStyle={this.props.setStyle}
	 	          unsetStyle={this.props.unsetStyle}
	 	          onFocus={this.props.general.onFocus}
	 	          onBlur={this.props.general.onBlur}
	 	          getTags={this.props.getTags}
	 	          tag={this.props.tag}
	 	          searchTag={this.props.general.searchTag}
	 	          updateTagSearch={this.props.updateTagSearch}
	 	          addPost={this.props.addPost}
	 	          post={this.props.post}
		          user={this.props.auth.user}
	 	          email={loggedEmail}
	 	          searchTutorial={this.props.general.searchTutorial}
	 	          updateTutorialSearch={this.props.updateTutorialSearch}
	 	          tutorial={this.props.tutorial}
	 	          isAdmin={()=>this.isAdmin(loggedEmail)} />

						<PropsRoute path="/administration/posts/edit/:id" component={EditPost}
	 	          authenticate={loggedEmail}
	 	          listOfAuthenticatedEmails={authenticatedEmails}
		          style={this.props.general.style}
		          setStyle={this.props.setStyle}
		          unsetStyle={this.props.unsetStyle}
		          onFocus={this.props.general.onFocus}
		          onBlur={this.props.general.onBlur}
		          post={this.props.post}
		          updatePost={this.props.updatePost}
		          getPostById={this.props.getPostById}
		          getTagsByPostId={this.props.getTagsByPostId}
		          chosenTags={this.props.post.tags}
		          tags={this.props.tag.tags}
		          searchTag={this.props.general.searchTag}
	 	          updateTagSearch={this.props.updateTagSearch}
	 	          searchTutorial={this.props.general.searchTutorial}
	 	          updateTutorialSearch={this.props.updateTutorialSearch}
	 	          tutorial={this.props.tutorial}
	 	          getTutorialsByPostId={this.props.getTutorialsByPostId}
		          email={loggedEmail} />


 	          <PropsRoute component={NotFound} />
       	  </Switch>
	  		 <Footer/>
  			</div>
  		</BrowserRouter>
  	);
	}
}

const mapStateToProps = (state) => {
	return {
		general: state.generalReducer,
		auth: state.authReducer,
		post: state.postReducer,
		comment: state.commentReducer,
		tag: state.tagReducer,
		timeline: state.timelineReducer,
		tutorial: state.tutorialReducer
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setStyle:() => {
			dispatch(setStyle());
		},
		unsetStyle:() => {
			dispatch(unsetStyle());
		},
		getAllPosts:()=>{
			dispatch(getAllPosts());
		},
		getPostById:(id)=>{
			dispatch(getPostById(id))
			.then(()=>dispatch(getTagsByPostId(id)))
			.then(()=>dispatch(getTutorialsByPostId(id)))
			.then(()=>dispatch(getCommentsByPostId(id)))
		},
		deletePost:(id)=>{
			dispatch(deletePost(id));
		},
		addPost:(data)=>{
			dispatch(addPost(data))
		},
		getCommentsByPostId:(data)=>{
			dispatch(getCommentsByPostId(data));
		},
		addComment:(data)=>{
			dispatch(addComment(data))
		},
		deleteComment:(id)=>{
			dispatch(deleteComment(id))
		},
		updatePost:(id, data)=>{
			dispatch(updatePost(id, data))
		},
		incrementPage:(length)=>{
			dispatch(incrementPage(length));
		},
		decrementPage: ()=>{
			dispatch(decrementPage());
		},
		updateSearch: (word) => {
			dispatch(updateSearch(word));
		},
		getTags: ()=>{
			dispatch(getTags());
		},
		updateTagSearch: (word) => {
			dispatch(updateTagSearch(word));
		},
		getTagsByPostId: (id) => {
			dispatch(getTagsByPostId(id));
		},
		createTag: (data) => {
			dispatch(createTag(data));
		},
		deleteTag: (data) => {
			dispatch(deleteTag(data));
		},
		getTimeline: () => {
			dispatch(getTimeline());
		},
		createTimeline: (data) => {
			dispatch(createTimeline(data));
		},
		deleteTimeline: (id) => {
			dispatch(deleteTimeline(id));
		},
		updateTimeline: (data) =>{
			dispatch(updateTimeline(data));
		},
		getTutorials: ()=>{
			dispatch(getTutorials());
		},
		createTutorial:(data)=>{
			dispatch(createTutorial(data));
		},
		deleteTutorial: (data) => {
			dispatch(deleteTutorial(data));
		},
		updateTutorialSearch: (word)=>{
			dispatch(updateTutorialSearch(word));
		},
		getTutorialsByPostId: (id) => {
			dispatch(getTutorialsByPostId(id));
		},
		getAuthenticatedUsers: () => {
			dispatch(getAuthenticatedUsers());
		},
		createAuthenticatedUser: (data) => {
			dispatch(createAuthenticatedUser(data));
		},
		deleteAuthenticatedUser: (authenticatedId) => {
			dispatch(deleteAuthenticatedUser(authenticatedId));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

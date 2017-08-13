import React from "react";
import {Link} from "react-router-dom";
import {PageTitle} from "./PageTitle";
import {Post} from  "./Post";
export class Filter extends React.Component{
	componentDidMount(){
    window.scrollTo(0, 0);
    setTimeout(() => this.props.setStyle(), 200);
  }

  componentWillUnmount(){
    this.props.unsetStyle();
  }

	render() {
		const {category, id, word} = this.props.match.params;
		const {posts, tags, tutorials} = this.props;
    if(isNaN(Number(id))) location.pathname="/NotFound";
    let currentObject = category == "tag" ?  Object(tags.filter(tag => tag.tagId==id)[0]) : Object(tutorials.filter(tutorial => tutorial.tutorialId==id)[0]);
    let filteredPosts= [];
		category == "tag" ? posts.map(post => post.tags.includes(currentObject._id) ? filteredPosts.push(post) : "") : posts.map(post => post.tutorials.includes(currentObject._id) ? filteredPosts.push(post) : "");
  	filteredPosts = filteredPosts.map( (post, index) => ( <Post key={index} postId={post.postId} id={post._id} tagsLength={post.tags.length  == undefined ? 0 : post.tags.length} commentsLength={post.comments.length == undefined ? 0 : post.comments.length} title={post.title} description={post.description} /> ));
    let title = category == "tag" ? `Showing posts that contain tag ${currentObject.tag == undefined ? " ": currentObject.tag}` : `Showing posts in ${currentObject.tutorial == undefined ? " " : currentObject.tutorial} tutorial`;
    return(
      <div>
        <PageTitle title={title}/>
        <main style={this.props.style}>
          {filteredPosts.length == 0 && <p className="simpleGrayNotification">No posts related to this {category}.</p>}
          {filteredPosts}
        </main>
      </div>
    );
  }
}

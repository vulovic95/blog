import React from "react";
import PropTypes from "prop-types";
import {Post} from "./Post";
import {NavLink} from "react-router-dom";
import {Pagination} from "./Pagination";
import {PageTitle} from "./PageTitle";
export class Administration extends React.Component{
	componentDidMount(){
		window.scrollTo(0, 0);
		setTimeout(() => this.props.setStyle(), 400);
	}
  componentWillUnmount(){
    this.props.unsetStyle();
  }
	render() {
		var posts=this.props.post.posts;
    posts=posts.map((post, index)=> <Post key={index}
																					postId={post.postId}
																					id={post._id}
																					tags={this.props.post.tags}
																					tagsLength={post.tags.length  == undefined ? 0 : post.tags.length}
																					commentsLength={post.comments.length == undefined ? 0 : post.comments.length}
																					title={post.title}
																					description={post.description}
																					photo={post.photo}
																					deletePost={this.props.deletePost}
																					email={post.email}
																					tutorials={post.tutorials}
																					date={post.date} />);
  	return(
  		<div>
        <PageTitle title="Administrate posts"/>
        <main style={this.props.style}>
					{this.props.paginate(posts, this.props.pageSize, this.props.pageNumber)}
          {posts.length > 10 && <Pagination onIncrement={()=>this.props.incrementPage(posts.length)} onDecrement={()=>this.props.decrementPage()} /> }
        </main>
      </div>
  	);
	}
}

Administration.propTypes = {
  style: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  unsetStyle: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  paginate: PropTypes.func.isRequired,
  decrementPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired
};

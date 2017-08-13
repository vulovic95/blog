import React from "react";
import PropTypes from "prop-types";
import {AddComment} from "./AddComment";
import {Comment} from "./Comment";
import {timeConverter} from "../js/functions";

export class Comments extends React.Component{
  render() {
    var id= this.props.postId;
    var postComments = this.props.comment.comments;
    var count=postComments.length;
		var comments=postComments.map((comment, index) => <Comment key={index}
                                                              id={comment._id}
                                                              userEmail={comment.email}
                                                              comment={comment.comment}
                                                              deleteComment={this.props.deleteComment}
                                                              date={timeConverter(comment.date)}
                                                              email={this.props.email}
                                                              displayName={comment.displayName}
                                                              postId={id} />);
   	return(
  		<div className="commentContainer">
  			<p className="notify bold">{comments.length > 0 ? comments.length : "No"} {comments.length == 1 ? "comment": "comments"} on this post{!this.props.email && ". Sign in to comment."}</p>
  			{comments}
  			{this.props.email && <AddComment onFocus={this.props.onFocus}
                                         onBlur={this.props.onBlur}
                                         user={this.props.user}
                                         postId={this.props.originalId}
                                         email={this.props.email}
                                         addComment={this.props.addComment} />}
  		</div>
  	);
	}
}

Comments.propTypes = {
  getCommentsByPostId: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};

import React from "react";
import PropTypes from "prop-types";
import FaDelete from "react-icons/lib/go/trashcan";

const LabelDelete = (props) => (<span className="onlyIcon right">
																	<button className="link" onClick={props.handleDelete} title="Delete your comment">
																		<FaDelete size={20} fill="gray"/> Remove
																	</button>
																</span>);

export const Comment = (props) => (
	<div className="lightGrayBackground">
		<p className="post-about">{props.comment}</p>
		<div>
			{props.userEmail === props.email &&	<LabelDelete id={props.id}
																											handleDelete={() => {
																												if(confirm("Remove comment?")) props.deleteComment(props.id)
																											}} />}
			<span className="post-icon medium">{props.displayName} on {props.date}</span>
			<div className="clear"></div>
		</div>
	</div>
);

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

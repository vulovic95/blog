const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
	index: async(req, res, next) => {
		const comments = await Comment.find({});
		res.status(200).json(comments);
	},
	newComment: async(req, res, next) => {
		const parent = await Post.findById(req.value.body.parent);//find the actual post
		const newComment = req.value.body; //create a new comment
		delete newComment.parent;
		const comment = new Comment(req.value.body);
		comment.parent = parent;
		await comment.save();
		parent.comments.push(comment);//add new comment to post
		await parent.save();
		res.status(200).json(comment);
	},
	getComment: async(req, res, next) => {
		const comment = await Comment.findById(req.value.params.commentId);
		res.status(200).json(comment);
	},
	replaceComment: async(req, res, next) => {
		const { commentId } = req.value.params;
		const newComment = req.value.body;
		const results = await Comment.findByIdAndUpdate(commentId, newComment);
		res.status(200).json({success: true});
	},
	updateComment: async(req, res, next) => {
		const { commentId } = req.value.params;
		const newComment = req.value.body;
		const results = await Comment.findByIdAndUpdate(commentId, newComment);
		res.status(200).json({success: true});
	},
	deleteComment: async(req, res, next) => {
		const { commentId } = req.value.params;
		const comment = await Comment.findById(commentId);
		if(!comment) {
			return res.status(400).json({error: "Comment does not exist."});
		}
		const parentId = comment.parent;
		const parent = await Post.findById(parentId);

		await comment.remove();

		parent.comments.pull(comment);
		await parent.save();

		res.status(200).json({success:true, id: commentId});
	}
}
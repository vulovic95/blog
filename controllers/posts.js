const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports = {
	index: async(req, res, next) => {
		const posts = await Post.find({});
		res.status(200).json(posts);
	},
	newPost: async(req, res, next) => {
		const newPost = new Post(req.value.body);
		const post = await newPost.save();
		res.status(201).json(post);
	},
	getPost: async(req, res, next) => {
		const { postId } = req.value.params;
		const post = await Post.find({postId});
		res.status(200).json(post[0]);
	},
	replacePost: async(req, res, next) => {
		const { postId } = req.value.params;
		const newPost = req.value.body;
		const result = await Post.findByIdAndUpdate(postId, newPost);
		res.status(200).json({success:true})
	},
	updatePost: async(req, res, next) => {
		const { postId } = req.value.params;
		const newPost = req.value.body;
		const result = await Post.findOneAndUpdate({postId:postId}, newPost);
		res.status(200).json({success:true, id: postId, title: newPost.title, description: newPost.description, photo: newPost.photo})
	},
	getPostTags: async(req, res, next) => {
		const { postId } = req.value.params;
		const post = await Post.find({postId:postId}).populate("tags");
		res.status(200).json(post[0].tags);
	},
	getPostTutorials: async(req, res, next) => {
		const { postId } = req.value.params;
		const post = await Post.find({postId:postId}).populate("tutorials");
		res.status(200).json(post[0].tutorials);
	},
	getPostComments: async(req, res, next) => {
		const { postId } = req.value.params;
		const post = await Post.find({postId}).populate("comments");
		res.status(200).json(post[0].comments);
	},
	newPostComment: async(req, res, next) => {
		const { postId } = req.value.params;
		const newComment =  new Comment(req.value.body);

		const post = await Post.findById(postId);
		newComment.parent = post;
		await newComment.save();

		post.comments.push(newComment);
		await post.save();
		res.status(200).json(newComment);
	},
	deletePost: async(req, res, next) => {
		const { postId } = req.value.params;
		const post = await Post.findById(postId);
		if(!post) {
			return res.status(400).json({error: "Post does not exist."});
		}
		for(let comment of post.comments){
			var comm = Comment.findById(comment);
			await comm.remove();
		}
		await Post.findByIdAndRemove(postId);
		res.status(200).json({success:true, id: postId});
	}
}
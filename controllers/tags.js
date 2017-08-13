const Post = require("../models/post");
const Tag = require("../models/tags");
module.exports = {
	index: async(req, res, next) => {
		const tags = await Tag.find({});
		res.status(200).json(tags);
	},
	newTag: async(req, res, next) => {
		const parent = await Post.findById(req.value.body.parent);
		const tag = await Tag.findById(req.value.body.tag);
		parent.tags.push(tag);
		await parent.save();
		res.status(200).json(parent);
	},
	createTag: async(req, res, next) => {
		const tag = new Tag(req.value.body);
		await tag.save();
		res.status(200).json(tag);
	},
	getTag: async(req, res, next) => {
		const tag = await Tag.findById(req.value.params.tagId);
		res.status(200).json(tag);
	},
	deleteTag: async(req, res, next) => {
		const tagId = req.value.params.tagId;
		const posts  = await Post.find({tags:tagId});
		for(var post of posts){ 
			post.tags.remove(tagId);
			await post.save();
		}
		await Tag.findByIdAndRemove(tagId); 
		res.status(200).json({success:true, id: tagId});
	}
}

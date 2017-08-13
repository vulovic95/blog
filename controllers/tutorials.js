const Post = require("../models/post");
const Tutorial = require("../models/tutorial");
module.exports = {
	index: async(req, res, next) => {
		const tutorials = await Tutorial.find({});
		res.status(200).json(tutorials);
	},
	createTutorial: async(req, res, next) => {
		const tutorial = new Tutorial(req.value.body);
		await tutorial.save();
		res.status(200).json(tutorial);
	},	
	deleteTutorial: async(req, res, next) => {
		const tutorialId = req.value.params.tutorialId;
		const posts  = await Post.find({tutorials:tutorialId});
		for(var post of posts){ 
			post.tutorials.remove(tutorialId);
			await post.save();
		}
		await Tutorial.findByIdAndRemove(tutorialId); 
		res.status(200).json({success:true, id: tutorialId});
	}
}
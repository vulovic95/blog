const Authentication = require("../models/authentication");

module.exports = {
	index: async(req, res, next) => {
		const authenticatedUsers = await Authentication.find({});
		res.status(200).json(authenticatedUsers);
	},
	createAuthenticatedUser: async(req, res, next) => {
		const authenticatedUser = new Authentication(req.value.body);
		await authenticatedUser.save();
		res.status(200).json(authenticatedUser);
	},
	deleteAuthenticatedUser: async(req, res, next) => {
		const { authenticatedId } = req.value.params;
		const authenticatedUser = await Authentication.findById(authenticatedId);
		if(!authenticatedUser) {
			return res.status(400).json({error: "Such authenticated user does not exist."});
		}
		await authenticatedUser.remove();
		res.status(200).json({success:true, id: authenticatedId});
	}
}
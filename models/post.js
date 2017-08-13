const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/blog");
autoIncrement.initialize(connection);

const PostSchema = new Schema({
		title: String,
		description: String,
		photo: String,
		comments: [{
			type: Schema.Types.ObjectId,
			ref: "comment"
		}],
		tags:[{
			type: Schema.Types.ObjectId,
			ref: "tag"
		}],
		tutorials:[{
			type: Schema.Types.ObjectId,
			ref: "tutorial"
		}],
		email: String,
		date: Date,
		displayName:String
})
PostSchema.plugin(autoIncrement.plugin, { model: 'post', field: 'postId' })
const Post = mongoose.model("post", PostSchema);
module.exports = Post;
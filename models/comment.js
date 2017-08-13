const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost/blog");
autoIncrement.initialize(connection);

const CommentSchema = new Schema({
	comment: String,
	date: Date,
	email: String,
	parent: {
		type: Schema.Types.ObjectId,
		ref: "post"
	},
	displayName: String
});

CommentSchema.plugin(autoIncrement.plugin, { model: 'comment', field: 'commentId' })

const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
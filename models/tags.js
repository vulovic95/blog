const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

var connection = mongoose.createConnection("mongodb://localhost/blog");
autoIncrement.initialize(connection);


const TagSchema = new Schema({
	tag: String
});

TagSchema.plugin(autoIncrement.plugin, { model: 'tag', field: 'tagId' })

const Tag = mongoose.model("tag", TagSchema);
module.exports = Tag;
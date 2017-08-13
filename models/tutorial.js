const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection("mongodb://localhost/blog");
autoIncrement.initialize(connection);

const TutorialSchema = new Schema({
	tutorial: String
});

TutorialSchema.plugin(autoIncrement.plugin, { model: 'tutorial', field: 'tutorialId' });
const Tutorial = mongoose.model("tutorial", TutorialSchema);
module.exports = Tutorial;
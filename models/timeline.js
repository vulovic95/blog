const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimelineSchema = new Schema({
	year: Number,
	text: String, 
	singlePoint: Number,
	timelineType: Number
});

const Timeline = mongoose.model("timeline", TimelineSchema);
module.exports = Timeline;
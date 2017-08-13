const Timeline = require("../models/timeline");

module.exports = {
	index: async(req, res, next) => {
		const timelines = await Timeline.find({}).sort("year");
		res.status(200).json(timelines);
	},
	createTimeline: async(req, res, next) => {
		const timeline = new Timeline(req.value.body);
		await timeline.save();
		res.status(200).json(timeline);
	},
	getTimeline: async(req, res, next) => {
		const timeline = await Timeline.findById(req.value.params.timelineId);
		res.status(200).json(timeline);
	},
	deleteTimeline: async(req, res, next) => {
		const timelineId = req.value.params.timelineId;
		await Timeline.findByIdAndRemove(timelineId); 
		res.status(200).json({success:true, id: timelineId});
	},
	replaceTimeline: async(req, res, next) => {
		const { timelineId } = req.value.params;
		const newTimeline = req.value.body;
		const result = await Timeline.findByIdAndUpdate(timelineId, newTimeline);
		res.status(200).json({success:true, id: timelineId, text: newTimeline.text, year: newTimeline.year, singlePoint: newTimeline.singlePoint, timelineType: newTimeline.timelineType})
	},
	updateTimeline: async(req, res, next) => {
		const { timelineId } = req.value.params;
		const newTimeline = req.value.body;
		const result = await Timeline.findByIdAndUpdate(timelineId, newTimeline);
		res.status(200).json({success:true, id: timelineId, text: newTimeline.text, year: newTimeline.year, singlePoint: newTimeline.singlePoint, timelineType: newTimeline.timelineType})
	}
}

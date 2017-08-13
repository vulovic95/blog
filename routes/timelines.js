const express = require("express");
const router = require("express-promise-router")();
const TimelineController = require("../controllers/timelines");
const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers");

router.route("/")
	.get(TimelineController.index)
	.post(validateBody(schemas.timelineSchema), TimelineController.createTimeline);

router.route("/:timelineId")
	.get(validateParam(schemas.idSchema, "timelineId"), TimelineController.getTimeline)
  .put([validateParam(schemas.idSchema, "timelineId"), validateBody(schemas.timelineSchema)], TimelineController.replaceTimeline)
  .patch([validateParam(schemas.idSchema, "timelineId"), validateBody(schemas.optionalTimelineSchema)], TimelineController.updateTimeline)
	.delete(validateParam(schemas.idSchema,"timelineId"), TimelineController.deleteTimeline);

module.exports = router;
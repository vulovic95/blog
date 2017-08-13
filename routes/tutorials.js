const express = require("express");
const router = require("express-promise-router")();
const TutorialController = require("../controllers/tutorials");
const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers");

router.route("/")
	.get(TutorialController.index);

router.route("/:tutorialId")
		.delete(validateParam(schemas.idSchema,"tutorialId"), TutorialController.deleteTutorial);

router.route("/create")
	.post(validateBody(schemas.createTutorialSchema), TutorialController.createTutorial);

module.exports = router;
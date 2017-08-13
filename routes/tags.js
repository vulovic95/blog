const express = require("express");
const router = require("express-promise-router")();
const TagController = require("../controllers/tags");
const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers");

router.route("/")
	.get(TagController.index)
	.post(validateBody(schemas.tagSchema), TagController.newTag);

router.route("/:tagId")
	.get(validateParam(schemas.idSchema, "tagId"), TagController.getTag)
	.delete(validateParam(schemas.idSchema,"tagId"), TagController.deleteTag);

router.route("/create")
	.post(validateBody(schemas.createTagSchema), TagController.createTag);

module.exports = router;
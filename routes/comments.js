const express = require("express"); 
const router = require("express-promise-router")();

const CommentController = require("../controllers/comments");

const {	validateBody, validateParam, schemas } = require ("../helpers/routeHelpers");

router.route("/")
	.get(CommentController.index)
	.post(validateBody(schemas.commentSchema), CommentController.newComment);

router.route("/:commentId")
	.get(validateParam(schemas.idSchema, "commentId"), CommentController.getComment)
	.put([validateParam(schemas.idSchema, "commentId"), validateBody(schemas.relPostCommentSchema)], CommentController.replaceComment)
	.patch([validateParam(schemas.idSchema, "commentId"), validateBody(schemas.optionalCommentSchema)], CommentController.updateComment)
	.delete(validateParam(schemas.idSchema, "commentId"), CommentController.deleteComment);



module.exports = router;
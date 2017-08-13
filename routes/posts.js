const express = require("express");
const router = require("express-promise-router")();
const PostController = require("../controllers/posts");
const {validateParam, schemas, validateBody} = require("../helpers/routeHelpers");
var fs = require('fs');
var multer  = require('multer');


router.route("/")
  .get(PostController.index)
  .post(validateBody(schemas.postSchema), PostController.newPost);

router.route("/:postId")
  .get(validateParam(schemas.integerIdSchema, "postId"), PostController.getPost)
  .put([validateParam(schemas.idSchema, "postId"), validateBody(schemas.postSchema)], PostController.replacePost)
  .patch([validateParam(schemas.integerIdSchema, "postId"), validateBody(schemas.optionalPostSchema)], PostController.updatePost)
  .delete(validateParam(schemas.idSchema, "postId"), PostController.deletePost);


router.route("/:postId/tags")
  .get(validateParam(schemas.integerIdSchema, "postId"), PostController.getPostTags)


router.route("/:postId/tutorials")
  .get(validateParam(schemas.integerIdSchema, "postId"), PostController.getPostTutorials)  

router.route("/:postId/comments")
  .get(validateParam(schemas.integerIdSchema, "postId"), PostController.getPostComments)
  .post([validateParam(schemas.idSchema, "postId"), validateBody(schemas.relPostCommentSchema)], PostController.newPostComment);

var path=require("path");
var upload = multer({ dest: "src/img/upload/"});
var type = upload.single('photo');

router.post('/file_upload', type, function (req,res, next) {
  var tmp_path = req.file.path;
  var target_path = "src/img/upload/" + req.file.originalname;
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  fs.unlink(tmp_path);
  src.on('end', function() { 
  	res.send('complete');
  });
  src.on('error', function(err) { 
  	res.send('error'); 
  });
});


module.exports = router;
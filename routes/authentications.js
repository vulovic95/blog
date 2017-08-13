const express = require("express"); 
const router = require("express-promise-router")();

const AuthenticationController = require("../controllers/authentications");
const {	validateBody, validateParam, schemas } = require ("../helpers/routeHelpers");

router.route("/")
	.get(AuthenticationController.index)
	.post(validateBody(schemas.authenticationSchema), AuthenticationController.createAuthenticatedUser);


router.route("/:authenticatedId")
	.delete(validateParam(schemas.idSchema, "authenticatedId"), AuthenticationController.deleteAuthenticatedUser);

module.exports = router;

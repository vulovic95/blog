const Joi = require("joi");

module.exports =  {
	validateParam: (schema, name) => {
		return (req, res, next) => {
			const result = Joi.validate({ param: req["params"][name] }, schema);
			if(result.error){
				return res.status(400).json(result.error);
			} else {
				if(!req.value)
					req.value = {};
				if(!req.value["params"])
					req.value["params"] = {};
				req.value["params"][name] = result.value.param;
				next();
			}
		}
	},
	validateBody: (schema) => {
		return (req, res, next) => {
			const result = Joi.validate(req.body, schema);
			if(result.error){
				return res.status(400).json(result.error);
			} else {
				if(!req.value)
					req.value = {};
				if(!req.value["body"])
					req.value["body"] = {}
				req.value["body"] = result.value;
				next();
			}
		}
	},
	schemas: {
		idSchema:Joi.object().keys({
			param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}),
		integerIdSchema:Joi.object().keys({
			param: Joi.number().min(0).required()
		}),
		authenticationSchema: Joi.object().keys({
			email: Joi.string().email().required()
		}),
		postSchema: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			photo: Joi.string().required(),
			tags: Joi.array().items(Joi.string()).required(),
			tutorials: Joi.array().items(Joi.string()),
			email: Joi.string().email().required(),
			date: Joi.date().timestamp(),
			displayName: Joi.string().required()
		}),
		optionalPostSchema: Joi.object().keys({
			title: Joi.string(),
			description: Joi.string(),
			photo: Joi.string(),
			tags: Joi.array().items(Joi.string()),
			email: Joi.string().email(),
			date: Joi.date().timestamp(),
			tutorials: Joi.array().items(Joi.string())
		}),
		commentSchema: Joi.object().keys({
			comment: Joi.string().required(),
			email: Joi.string().email().required(),
			date: Joi.date().timestamp(),
			parent: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			displayName: Joi.string().required()
		}),
		optionalCommentSchema: Joi.object().keys({
			comment: Joi.string(),
			email: Joi.string().email(),
			date: Joi.date().timestamp(),
		}),
		relPostCommentSchema: Joi.object().keys({
			comment: Joi.string().required(),
			email: Joi.string().email().required(),
			date: Joi.date().timestamp(),
		}),
		tagSchema: Joi.object().keys({
			tag: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
			parent: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
		}),
		createTagSchema: Joi.object().keys({
			tag: Joi.string().required()
		}),
		timelineSchema: Joi.object().keys({
			year: Joi.number().required(),
			text: Joi.string().required(),
			singlePoint: Joi.number().required(),
			timelineType: Joi.number().required()
		}),
		optionalTimelineSchema: Joi.object().keys({
			year: Joi.number(),
			text: Joi.string(),
			singlePoint: Joi.number(),
			timelineType: Joi.number()
		}),
		createTutorialSchema: Joi.object().keys({
			tutorial: Joi.string().required()
		}),
	}
}
const express = require("express");
const morganLogger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
var cors = require('cors');
var fs = require('fs');
var multer  = require('multer');

mongoose.Promise = global.Promise;

var mongoURI = "mongodb://ivan:k4tastrofa@ds153853.mlab.com:53853/blog";
//var mongoURI = "mongodb://localhost/blog";
var MongoDB = mongoose.connect(process.env.MONGOLAB_URI || mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});

var path = require("path");
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.static("dist"));

const posts = require("./routes/posts");
const comments = require("./routes/comments");
const tags = require("./routes/tags");
const timelines = require("./routes/timelines");
const tutorials = require("./routes/tutorials");
const authentications = require("./routes/authentications");

//MIDDLEWARES
app.use(morganLogger("dev"));
app.use(bodyParser.json());

//ROUTES
app.use("/api/posts", posts);
app.use("/api/comments", comments);
app.use("/api/tags", tags);
app.use("/api/timelines", timelines);
app.use("/api/tutorials", tutorials);
app.use("/api/authentications", authentications);


//Catch 404 errors

app.use((err, req, res, next) => {
	const error = app.get("env") === "development" ? err : {};
	const status = err.status || 500;

	res.status(status).json({
		error:{
			message: error.message
		}
	})
  
	console.log(error.message);
})

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.get("*", (req, res) => {
	res.sendFile('dist/index.html' , { root : __dirname});
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log("Server listening on ", port));

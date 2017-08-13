const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthenticationSchema = new Schema({
	email: String
});

const Authentication = mongoose.model("authentication", AuthenticationSchema);
module.exports = Authentication;
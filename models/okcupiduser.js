var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var okCupidUserSchema = new Schema({
	username	: String,
	password	: String,
	date        : {type: Date, default: Date.now}
});

module.exports = mongoose.model("OkCupidUser", okCupidUserSchema);
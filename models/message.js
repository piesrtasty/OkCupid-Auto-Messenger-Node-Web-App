var mongoose = require('mongoose')
	, Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;

var messageSchema = new Schema({
	okCupidUsername	: ObjectId,
	toUsername		: String,
	message         : String,
	date            : {type: Date, default: Date.now}	
});

module.exports = mongoose.model("Message", messageSchema);
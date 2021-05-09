const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
	{
		users: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
		}],
		messages: [{
			type: Schema.Types.ObjectId,
			ref: 'Message',
		}],
	},
	{
		versionKey: false,
	},
);

module.exports = model("Chat", ChatSchema);

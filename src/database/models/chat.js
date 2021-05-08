const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
	{
		users: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
		}],
	},
	{
		versionKey: false,
	},
);

module.exports = model("Chat", ChatSchema);

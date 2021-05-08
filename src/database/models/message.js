const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
		chat: {
			type: Schema.Types.ObjectId,
			ref: 'Chat',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
			require: true,
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("Message", MessageSchema);

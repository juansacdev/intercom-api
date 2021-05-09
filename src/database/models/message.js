const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
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

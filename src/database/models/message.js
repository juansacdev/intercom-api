const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
		message: {
			type: String,
			require: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("Message", MessageSchema);

const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
	{
		message: {
			type: String,
			require: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		time: {
			type: String,
			default: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("Message", MessageSchema);

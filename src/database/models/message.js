const { Schema, model } = require("mongoose");
const dateHour = new Date().getHours() - 5
const dateMinutes = new Date().getMinutes() + 3
const dateSeconds = new Date().getSeconds()
const fullDate = `${dateHour}:${dateMinutes}:${dateSeconds}`

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
			default: fullDate,
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("Message", MessageSchema);

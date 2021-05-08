const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		photo: {
			type: String,
			default: "https://i.imgur.com/2ds4WjY.png",
		},
		info: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
		phone_number: {
			type: Number,
			require: true,
		},
	},
	{
		versionKey: false,
	},
);

module.exports = model("User", UserSchema);

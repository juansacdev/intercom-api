const User = require("../../database/models/user");

const createUsers = async () => {
	try {
		const count = await User.estimatedDocumentCount();

		if (count) {
			return;
		}

		await Promise.all([
			new User({
				name: "Juan Sebastián",
				info:"I'm a computer nerd",
				username: "juansacok",
				password: "usuario1",
				phone_number: 3113253843
			}).save(),
			new User({
				name: "Tomas",
				info:"Hi, I'm Tomas!",
				username: "tomas",
				password: "usuario2",
				phone_number: 3233253843
			}).save()
		]);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createUsers,
};

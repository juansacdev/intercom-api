const User = require("../../../database/models/user");

const getAllUsers = () => User.find();

const getOneUserById = (userId) => User.findById(userId);

const updateUserById = async (userId, userData) => {
	const userUpdated = await User.findByIdAndUpdate(userId, userData, {
		new: true,
	});

	if (!userUpdated) {
		return null;
	}

	await userUpdated.save();
	return userUpdated;
};

module.exports = {
	getAllUsers,
	getOneUserById,
	updateUserById,
};

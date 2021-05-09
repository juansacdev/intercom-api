const Chat = require("../../../database/models/chat");

const getAllChats = () => {
	return new Promise((resolve, reject) => {
		try {
			Chat.find()
				.populate({
					path: "users",
					select: "_id name username",
				})
				.populate({
					path: "messages",
					select: "_id message",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const getOneChatById = (chatId) => {
	return new Promise((resolve, reject) => {
		try {
			const chatFound = Chat.findById(chatId);

			if (!chatFound) {
				return reject(null);
			}

			Chat.findById(chatId)
				.populate({
					path: "users",
					select: "_id name username",
				})
				.populate({
					path: "messages",
					select: "_id message",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const createOneChat = (chatData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const chatCreated = new Chat();
			await chatCreated.save();
			const { _id: chatId } = chatCreated;

			const { userid, toUserId } = chatData


			Chat.findByIdAndUpdate(chatId,
				{
					$addToSet: {
						users: [userid, toUserId],
					},
				},
				{ new: true },
			)
				.populate({
					path: "users",
					select: "_id name username",
				})
				.populate({
					path: "messages",
					select: "_id message",
				})
				.exec((error, data) => {
					if (error) {
						return reject(error);
					}
					resolve(data);
				});
		} catch (error) {
			console.error(error);
		}
	});
};

const deleteOneChatById = async (chatId) => {
	try {
		const chatFound = Chat.findById(chatId);

		if (!chatFound) {
			return null;
		}

		const chatFoundAndDeleted = Chat.findByIdAndDelete(chatId);

		if (!chatFoundAndDeleted) {
			return null;
		}

		return chatFoundAndDeleted;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getAllChats,
	getOneChatById,
    createOneChat,
	deleteOneChatById,
};

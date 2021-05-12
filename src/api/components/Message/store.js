const Message = require("../../../database/models/message");
const Chat = require("../../../database/models/chat");

const getAllMessages = () => {
	return new Promise((resolve, reject) => {
		try {
			Message.find()
				.populate({
					path: "user",
					select: "_id name username",
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

const createOneMessage = (messageData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const {chatId, ...msgData } = messageData
			// Crea Message
			const messageCreated = new Message(msgData);

			await messageCreated.save();

			// Se agrega Message al chat donde se envio
			const { _id: messageId } = messageCreated;

			const chatUpdated = await Chat.findByIdAndUpdate(
				chatId,
				{
					$addToSet: {
						messages: messageId,
					},
				},
				{ new: true },
			);
			await chatUpdated.save();

			// Resuelve con el message creado
			Message.findById(messageId)
				.populate({
					path: "user",
					select: "_id name username",
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

const updateMessageById = (messageId, messageData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const messageUpdated = await Message.findByIdAndUpdate(messageId, messageData, {
				new: true,
			});

			if (!messageUpdated) {
				return reject(null);
			}

			await messageUpdated.save();

			Message.findById(messageId)
				.populate({
					path: "user",
					select: "_id name username",
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

const deleteOneMessageById = async (messageId) => {
	try {
		const messageFound = Message.findById(messageId);

		if (!messageFound) {
			return null;
		}

		const messageFoundAndDeleted = Message.findByIdAndDelete(messageId);

		if (!messageFoundAndDeleted) {
			return null;
		}

		return messageFoundAndDeleted;
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	getAllMessages,
    createOneMessage,
	updateMessageById,
	deleteOneMessageById,
};

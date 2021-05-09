const response = require("../../lib/response");
const { socket } = require('../../../socket')
const {
	getAllMessages,
    createOneMessage,
	updateMessageById,
	deleteOneMessageById,
} = require('./store')

const getMessages = async (req, res) => {
	try {
		const data = await getAllMessages();
		return response.success({
			res,
			data,
			status: 200,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal error",
			status: 500,
			error,
		});
	}
}

const createMessage = async (req, res) => {
	const {
		message,
	} = req.body;

	const { userid } = req.headers
	const { chatId } = req.params

	if (!message) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	const messageData = {
		message,
		user_id: userid,
		chat_id: chatId,
	};

	try {
		socket.io.emit('message', messageData)
		const data = await createOneMessage(messageData);
		return response.success({
			res,
			data,
			msg: 'Message creado con exito!',
			status: 201,
		});
	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

const editMessageById = async (req, res) => {
	const messageData = {}

	if (req.body.message) {
		messageData.message = req.body.message
	}

	try {
		const { messageId } = req.params
		socket.io.emit('message', messageData)
		const data = await updateMessageById(messageId, messageData)

		if (!data) {
			return response.error({
				res,
				msg: "Este message no existe",
				status: 404,
				error: `Se intento actualizar un message que no existe`,
			});
		}

		return response.success({
			res,
			msg: 'Message actualizado con exito!',
			data,
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

const deleteMessageById = async (req, res) => {
	const { messageId } = req.params
	try {
		const data = await deleteOneMessageById(messageId)

		if (!data) {
			return response.error({
				res,
				msg: "El message no existe",
				status: 404,
				error: `Se intento eliminar un message que no existe`,
			});
		}

		return response.success({
			res,
			data,
			msg:'Message Eliminado con exito!',
			status: 200,
		});

	} catch (error) {
		return response.error({
			res,
			msg: "Internal Error",
			status: 500,
			error,
		});
	}
}

module.exports = {
	getMessages,
	createMessage,
	editMessageById,
    deleteMessageById
}
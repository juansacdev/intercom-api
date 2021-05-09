const response = require("../../lib/response");
const {
	getAllChats,
	getOneChatById,
    createOneChat,
	deleteOneChatById,
} = require('./store')

const getChats = async (req, res) => {
	try {
		const data = await getAllChats();
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

const getChatById = async (req, res) => {
    const { chatId } = req.params
	try {
		const data = await getOneChatById(chatId);

		if (!data) {
			return response.error({
				res,
				msg: "El chat no existe",
				status: 404,
				error: `Se intento obtener un chat que no existe`,
			});
		}

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

const createChat = async (req, res) => {
	const { userid } = req.headers
	const { toUserId } = req.params

	if (!userid) {
		return response.error({
			res,
			msg: "Por favor inserte cabecera userId",
			status: 400,
			error: "El usuario no ingreso la cabecera userId",
		});
	}

	if (!toUserId) {
		return response.error({
			res,
			msg: "Por favor inserte información en los campos",
			status: 400,
			error: "El usuario no ingreso los campos requeridos",
		});
	}

	const chatData = {
		toUserId,
		userid,
	};

	try {
		const data = await createOneChat(chatData);
		return response.success({
			res,
			data,
			msg: 'Chat creado con exito!',
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

const deleteChatById = async (req, res) => {
	const { chatId } = req.params
	try {
		const data = await deleteOneChatById(chatId)

		if (!data) {
			return response.error({
				res,
				msg: "El chat no existe",
				status: 404,
				error: `Se intento eliminar un chat que no existe`,
			});
		}

		return response.success({
			res,
			data,
			msg:'Chat Eliminado con exito!',
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
	getChats,
	createChat,
	getChatById,
    deleteChatById,
}
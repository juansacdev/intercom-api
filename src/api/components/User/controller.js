const response = require("../../lib/response");
const {
	getAllUsers,
	getOneUserById,
	updateUserById,
} = require('./store')

const getUsers = async (_req, res) => {
	try {
		const data = await getAllUsers();
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

const getUserById = async (req, res) => {
    const { userId } = req.params
	try {
		const data = await getOneUserById(userId);

		if (!data) {
			return response.error({
				res,
				msg: "El usuario no existe",
				status: 404,
				error: 'Se intento obtener un usuario que no existe',
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

const editUserById = async (req, res) => {
	const userData = {}

	if (req.body.name) {
		userData.name = req.body.name
	}

	if (req.body.info) {
		userData.info = req.body.info
	}

	if (req.body.username) {
		userData.username = req.body.username
	}

	if (req.body.password) {
		userData.password = req.body.password
	}

	try {
		const { userId } = req.params
		const data = await updateUserById(userId, userData)

		if (!data) {
			return response.error({
				res,
				msg: "Este user no existe",
				status: 404,
				error: `Se intento actualizar un user que no existe`,
			});
		}

		return response.success({
			res,
			msg: 'User actualizado con exito!',
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

module.exports = {
	getUsers,
	getUserById,
	editUserById,
}
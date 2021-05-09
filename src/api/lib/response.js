const success = ({ res, msg, data, status }) => {
	let fullData = data || "";
	let message = msg || 'Todo OK'

	res.status(status).send({
		statusCode: status,
		message,
		data: fullData,
	});
};

const error = ({ res, msg, status, error }) => {
	console.error(`Response errror: ${error}`);

	res.status(status).send({
		error: {
			statusCode: status,
			message: msg,
		},
	});
};

module.exports = {
	success,
	error,
};

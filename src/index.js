const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const http = require('http')
const server = http.Server(app)
const sockets = require("./socket");
const { port, dev } = require("./config");
const router = require("./api/lib/routes");
const { createUsers } = require('./api/lib/initialSetup')

// Init
require("./database");
createUsers()

// Sockets
sockets.connect(server);

app.get('/', (req, res) => {
	if (dev) {
		res.redirect('http://localhost:3000/api/doc/')
	}
	res.redirect('https://intercom--api.herokuapp.com/api/doc/')
})

// Middlewares
app.use(
	cors({
		origin: "*",
		preflightContinue: false,
		optionsSuccessStatus: 204,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
	}),
);
app.use(
	helmet({
		contentSecurityPolicy: false,
	}),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (dev) {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

// Routes
router(app);

// Server
server.listen(port, () =>
	console.log(`I'm alive. http://localhost:${port} 💯`),
);

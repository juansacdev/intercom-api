const socketIO = require('socket.io')
const socket = {};

function connect(server){
    socket.io = socketIO(server, {
        cors: {
            origin: '*',
            preflightContinue: false,
            optionsSuccessStatus: 204,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }
    })
}

module.exports = {
    connect,
    socket,
}
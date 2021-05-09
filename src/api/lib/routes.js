const user = require('../components/User/network')
const message = require('../components/Message/network')
const chat = require('../components/Chat/network')
const swaggerUi = require ('swagger-ui-express')
const swaggerDoc = require('../../public/swagger.json')
const { dev } = require('../../config')

const routes = server => {
    server.use('/api/users', user)
    server.use('/api/messages', message)
    server.use('/api/chats', chat)
    server.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

module.exports = routes
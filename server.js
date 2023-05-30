const express = require("express")
const usersRoutes = require("./routes/users")
const logger = require("./middleware/logger")

const server = express()

server.use(express.json())
server.use(logger)
server.use(usersRoutes.router)

module.exports = { server }
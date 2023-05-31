const express = require("express")
const usersRoutes = require("./routes/users")
const recipesRoutes = require("./routes/recipes")
const logger = require("./middleware/logger")

const server = express()

server.use(express.json())
server.use(logger)
server.use(usersRoutes.router)
server.use(recipesRoutes.router)

module.exports = { server }
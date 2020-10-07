const app = require('./app')
const http = require ('http')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`)
})



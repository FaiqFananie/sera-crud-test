const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
// const routes = require('../../Interfaces/routes/route')

const createServer = () => {
  const app = express()
  app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.use(cors())
  app.use(express.json({ limit: '5mb', type: 'application/json' }))
  app.use(express.urlencoded({ limit: '5mb', extended: true }))

  app.get('/', (_, res) => {
    res.json('hello world')
  })
  // routes(app, container, middleware)
  // app.use(middleware.responseError)

  return app
}

module.exports = createServer

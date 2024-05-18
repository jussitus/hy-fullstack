const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

morgan.token('content', ((req) => { return req.method === 'POST' ? JSON.stringify(req.body) : '' }))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use('/', blogsRouter)
//app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
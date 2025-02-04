//Env variables
require('dotenv').config()

import express from 'express'
import config from 'config'

// JSON middleware
const app = express()

// db
import db from '../config/db'

// Routes
import router from './router';

//Logger
import Logger from '../config/logger'

//Middlewares
import morganMiddleware from './middleware/mroganMiddleware'

app.use(morganMiddleware)
app.use('/api/', router)

// App port
const port = config.get<number>('port')

app.use(express.json())

app.listen(port, async () => {
  await db()

  Logger.info(`The application is running on port ${port}`)
})


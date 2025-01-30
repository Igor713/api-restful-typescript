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

app.use('/api/', router)

// App port
const port = config.get<number>('port')

app.use(express.json())

app.listen(port, async () => {
  await db()

  console.log(`The application is running on port ${port}`)
})


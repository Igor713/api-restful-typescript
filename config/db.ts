import mongoose from 'mongoose'
import config from 'config'
import Logger from '../config/logger'

async function connect() {
  const dbUri = config.get<string>('dbUri')
  Logger.info('Data base connected')

  try {
    await mongoose.connect(dbUri)
  } catch (error) {
    Logger.error('The server cannot be able to connect')
    Logger.error(`Error: ${error}`)
    process.exit(1)
  }
}

export default connect
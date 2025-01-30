import mongoose from 'mongoose'
import config from 'config'

async function connect() {
  const dbUri = config.get<string>('dbUri')
  console.log('Data base connected')

  try {
    await mongoose.connect(dbUri)
  } catch (error) {
    console.log('The server cannot be able to connect')
    console.log(error)
  }
}

export default connect
import { generateErrorMessage } from 'zod-error'
import envSchema from '../schema/env.schema'

function validatedEnv() {
  try {
    const env = {
      // NODE_ENV: process.env.NODE_ENV,
      PORT: "5000",
      MONGO_URI: "mongodb+srv://razamuzammil:Raza12611db@cluster0.aw0dziv.mongodb.net/",
      JWT_SECRET: "kjl21psy2mje3432hhash",
      // ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(', '),
    }
    const validationResult = envSchema.parse(env)
    return validationResult
  } catch (error: any) {
    console.error('Error in Environment Variables')
    console.error(
      generateErrorMessage(error.issues, {
        delimiter: { error: '\n' },
      })
    )
    // shutting the server down
    process.exit(1)
  }
}


export default validatedEnv

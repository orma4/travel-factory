import * as dotenv from 'dotenv'
dotenv.config()

import { AppDataSource } from './data-source'
import app from './app'

const PORT = Number(process.env.PORT ?? 3000)

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err)
    process.exit(1)
  })

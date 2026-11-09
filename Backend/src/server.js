import 'dotenv/config'
import app from './app.js'
import { connectDatabase } from './config/db.js'

const port = Number(process.env.PORT) || 5000

try {
  await connectDatabase()
} catch {
  console.error('Could not connect to MongoDB. See the sanitized connection diagnostics above.')
  process.exit(1)
}

app.listen(port, () => {
  console.log(`PawCare API listening on http://localhost:${port}`)
})

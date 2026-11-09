import cors from 'cors'
import cookieParser from 'cookie-parser'
import express from 'express'
import healthRoutes from './routes/healthRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/health', healthRoutes)

app.use((_request, _response, next) => {
  const error = new Error('Route not found.')
  error.statusCode = 404
  next(error)
})
app.use(errorHandler)

export default app

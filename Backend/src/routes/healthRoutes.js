import { Router } from 'express'
import mongoose from 'mongoose'

const router = Router()

router.get('/', (_request, response) => {
  response.json({
    success: true,
    message: 'PawCare API is running.',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

export default router

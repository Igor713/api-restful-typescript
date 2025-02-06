import { Router, Request, Response } from 'express'
import { createMovie, findMovieById } from './controllers/movieControllers'

//validations
import { validate } from './middleware/handleValidation'
import { movieCreateValidation } from './middleware/movieValidation'

const router = Router()

router.post('/movie', movieCreateValidation(), validate, createMovie)
router.get('/movie/:id', findMovieById)

export default router

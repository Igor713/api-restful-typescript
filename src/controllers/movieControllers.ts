import { Request, Response } from 'express'

//Model
import { MovieModel } from '../models/Movie'

// Logger
import Logger from '../../config/logger'

export async function createMovie(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body
    const movie = await MovieModel.create(data)
    res.status(201).json(movie)
  } catch (error: any) {
    Logger.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

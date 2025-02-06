import { Request, Response } from 'express'

//Model
import { MovieModel } from '../models/Movie'

// Logger
import Logger from '../../config/logger'
import { error } from 'console'
import mongoose from 'mongoose'

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

export async function findMovieById(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const movie = await MovieModel.findById(id)

    if (!movie) {
      res.status(404).json({ error: 'O filme não existe' })
      return
    }

    res.status(200).json(movie)
  } catch (error: any) {
    Logger.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

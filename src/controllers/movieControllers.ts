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

export async function getAllMovies(req: Request, res: Response) {
  try {
    const movies = await MovieModel.find()
    if (!movies) {
      res.status(404).json({ error: 'Não existem filmes para serem buscados' })
      return
    }

    res.status(200).json(movies)
  } catch (error: any) {
    Logger.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export async function removeMovie(req: Request, res: Response) {
  try {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const movie = await MovieModel.findById(id)

    if (!movie) {
      res.status(404).json({ error: 'O filme não existe' })
      return
    }

    await movie.deleteOne()

    res.status(200).json({ message: 'Filme removido com sucesso' })
  } catch (error: any) {
    Logger.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export async function updateMovie(req: Request, res: Response) {
  try {
    const id = req.params.id
    const data = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'ID inválido' })
      return
    }

    const movie = await MovieModel.findById(id)

    if (!movie) {
      res.status(404).json({ error: 'O filme não existe' })
      return
    }

    await MovieModel.updateOne({ _id: id }, data)

    res.status(200).json(data)
  } catch (error: any) {
    Logger.error(error.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

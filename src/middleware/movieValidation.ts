import { body } from 'express-validator'

export const movieCreateValidation = () => {
  return [
    body('title')
      .isString()
      .withMessage('O título é obrigatório.')
      .isLength({ min: 5 })
      .withMessage('O título precisa no mínimo de 5 caracteres.'),
    body('rating')
      .isNumeric()
      .withMessage('A nota precisa ser um número.')
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error('Os valores para nota são de 0 a 10.')
        }
        return true
      }),
    body('description').isString().withMessage('A descrição é obrigatória.'),
    body('director').isString().withMessage('O nome do diretor é obrigatório.'),
    body('poster').isURL().withMessage('O poster precisa ser uma URL.'),
  ]
}

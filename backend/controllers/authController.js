import bcrypt from 'bcrypt'
import prisma from '../database/prismaClient.js'

export async function register(req, res) {
  try {
    const { email, password, confirmPassword } = req.body

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' })
    }

    if (password !== confirmPassword ){
        return res.status(400).json ({ message: 'O campo de senha e confirmar senha devem ser iguais. '})
    }

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado.'})
    }

    const passwordHashed = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        email,
        password: passwordHashed
      }
    })

    return res.status(201).json({
      message: 'Conta criada com sucesso'
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'Erro interno do servidor'
    })
  }
}
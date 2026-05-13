import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'
import { UserRepository } from '../repositories/UserRepository'

const userService = new UserService(UserRepository)

export async function getUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await userService.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
}

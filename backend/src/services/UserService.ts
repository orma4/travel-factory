import { Repository } from 'typeorm'
import { User } from '../entities/User'

export class UserService {
  constructor(private readonly userRepo: Repository<User>) {}

  findAll(): Promise<User[]> {
    return this.userRepo.find()
  }

  findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id })
  }
}

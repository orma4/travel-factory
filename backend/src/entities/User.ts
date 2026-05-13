import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm'
import { VacationRequest } from './VacationRequest'

export type UserRole = 'requester' | 'validator'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar', length: 100 })
  name!: string

  @Column({ type: 'enum', enum: ['requester', 'validator'] })
  role!: UserRole

  @OneToMany(() => VacationRequest, (req) => req.user)
  vacationRequests!: VacationRequest[]
}

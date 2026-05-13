import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm'
import { User } from './User'

export type RequestStatus = 'pending' | 'approved' | 'rejected'

@Entity('vacation_requests')
@Index(['userId'])
@Index(['status'])
export class VacationRequest {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.vacationRequests, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user!: User

  @Column({ name: 'user_id' })
  userId!: number

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string

  @Column({ name: 'end_date', type: 'date' })
  endDate!: string

  @Column({ type: 'text', nullable: true })
  reason!: string | null

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status!: RequestStatus

  @Column({ type: 'text', nullable: true })
  comments!: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date
}

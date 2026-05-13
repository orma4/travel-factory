import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()

import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { VacationRequest } from '../entities/VacationRequest'

async function seed() {
  await AppDataSource.initialize()

  const userRepo = AppDataSource.getRepository(User)
  const requestRepo = AppDataSource.getRepository(VacationRequest)

  const usersData = [
    { name: 'Alice Martin', role: 'requester' as const },
    { name: 'Bob Nguyen', role: 'requester' as const },
    { name: 'Carol Smith', role: 'validator' as const },
  ]

  const users: User[] = []
  for (const data of usersData) {
    let user = await userRepo.findOneBy({ name: data.name })
    if (!user) {
      user = userRepo.create(data)
      await userRepo.save(user)
    }
    users.push(user)
  }

  const [alice, bob] = users

  const existingCount = await requestRepo.count()
  if (existingCount === 0) {
    const requests = [
      {
        user: alice,
        userId: alice.id,
        startDate: '2026-06-01',
        endDate: '2026-06-07',
        reason: 'Annual family vacation',
        status: 'pending' as const,
        comments: null,
      },
      {
        user: bob,
        userId: bob.id,
        startDate: '2026-07-14',
        endDate: '2026-07-18',
        reason: 'Wedding anniversary trip',
        status: 'approved' as const,
        comments: null,
      },
      {
        user: alice,
        userId: alice.id,
        startDate: '2026-05-20',
        endDate: '2026-05-21',
        reason: null,
        status: 'rejected' as const,
        comments: 'Critical project deadline during this period.',
      },
    ]

    for (const data of requests) {
      const req = requestRepo.create(data)
      await requestRepo.save(req)
    }
  }

  console.log('Seed complete: 3 users, 3 vacation requests.')
  await AppDataSource.destroy()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})

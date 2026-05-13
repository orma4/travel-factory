import request from 'supertest'
import app from '../../src/app'
import { AppDataSource } from '../../src/data-source'
import { VacationRequest } from '../../src/entities/VacationRequest'
import { User } from '../../src/entities/User'

let testUser: User

beforeAll(async () => {
  await AppDataSource.initialize()
  const userRepo = AppDataSource.getRepository(User)
  testUser = await userRepo.save(
    userRepo.create({ name: 'Test User', role: 'requester' })
  )
})

afterAll(async () => {
  const requestRepo = AppDataSource.getRepository(VacationRequest)
  const userRepo = AppDataSource.getRepository(User)
  await requestRepo.delete({ userId: testUser.id })
  await userRepo.delete({ id: testUser.id })
  await AppDataSource.destroy()
})

describe('POST /api/requests', () => {
  it('returns 201 and creates a request', async () => {
    const res = await request(app).post('/api/requests').send({
      userId: testUser.id,
      startDate: '2027-08-01',
      endDate: '2027-08-07',
      reason: 'Integration test',
    })

    expect(res.status).toBe(201)
    expect(res.body.status).toBe('pending')
    expect(res.body.userId).toBe(testUser.id)
  })

  it('returns 400 when endDate is before startDate', async () => {
    const res = await request(app).post('/api/requests').send({
      userId: testUser.id,
      startDate: '2027-08-10',
      endDate: '2027-08-01',
    })

    expect(res.status).toBe(400)
    expect(res.body.errors).toBeDefined()
  })

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/requests').send({ userId: testUser.id })
    expect(res.status).toBe(400)
  })
})

describe('PATCH /api/requests/:id', () => {
  let requestId: number

  beforeEach(async () => {
    const repo = AppDataSource.getRepository(VacationRequest)
    const req = await repo.save(
      repo.create({
        userId: testUser.id,
        startDate: '2027-09-01',
        endDate: '2027-09-05',
        reason: null,
        status: 'pending',
        comments: null,
      })
    )
    requestId = req.id
  })

  it('approves a pending request', async () => {
    const res = await request(app)
      .patch(`/api/requests/${requestId}`)
      .send({ status: 'approved' })

    expect(res.status).toBe(200)
    expect(res.body.status).toBe('approved')
  })

  it('returns 400 when rejecting without comments', async () => {
    const res = await request(app)
      .patch(`/api/requests/${requestId}`)
      .send({ status: 'rejected' })

    expect(res.status).toBe(400)
  })

  it('returns 409 when request is already processed', async () => {
    await request(app).patch(`/api/requests/${requestId}`).send({ status: 'approved' })

    const res = await request(app)
      .patch(`/api/requests/${requestId}`)
      .send({ status: 'rejected', comments: 'Too late' })

    expect(res.status).toBe(409)
  })
})

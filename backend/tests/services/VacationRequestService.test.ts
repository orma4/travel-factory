import { VacationRequestService, NotFoundError, ConflictError } from '../../src/services/VacationRequestService'
import { VacationRequest } from '../../src/entities/VacationRequest'
import { User } from '../../src/entities/User'
import { Repository } from 'typeorm'

const mockUser: User = { id: 1, name: 'Alice', role: 'requester', vacationRequests: [] }

const mockRequest: VacationRequest = {
  id: 1,
  userId: 1,
  user: mockUser,
  startDate: '2026-06-01',
  endDate: '2026-06-07',
  reason: 'Vacation',
  status: 'pending',
  comments: null,
  createdAt: new Date(),
}

function makeRepo<T>(overrides: Partial<Repository<T>> = {}): Repository<T> {
  return {
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    ...overrides,
  } as unknown as Repository<T>
}

describe('VacationRequestService', () => {
  describe('create', () => {
    it('throws NotFoundError when user does not exist', async () => {
      const requestRepo = makeRepo<VacationRequest>()
      const userRepo = makeRepo<User>({ findOneBy: jest.fn().mockResolvedValue(null) })
      const service = new VacationRequestService(requestRepo, userRepo)

      await expect(
        service.create({ userId: 99, startDate: '2026-06-01', endDate: '2026-06-07' })
      ).rejects.toThrow(NotFoundError)
    })

    it('creates and returns a new request', async () => {
      const saved = { ...mockRequest }
      const requestRepo = makeRepo<VacationRequest>({
        create: jest.fn().mockReturnValue(saved),
        save: jest.fn().mockResolvedValue(saved),
      })
      const userRepo = makeRepo<User>({ findOneBy: jest.fn().mockResolvedValue(mockUser) })
      const service = new VacationRequestService(requestRepo, userRepo)

      const result = await service.create({
        userId: 1,
        startDate: '2026-06-01',
        endDate: '2026-06-07',
        reason: 'Vacation',
      })

      expect(result.status).toBe('pending')
      expect(result.userId).toBe(1)
    })
  })

  describe('updateStatus', () => {
    it('throws NotFoundError when request does not exist', async () => {
      const requestRepo = makeRepo<VacationRequest>({ findOne: jest.fn().mockResolvedValue(null) })
      const userRepo = makeRepo<User>()
      const service = new VacationRequestService(requestRepo, userRepo)

      await expect(service.updateStatus(99, { status: 'approved' })).rejects.toThrow(NotFoundError)
    })

    it('throws ConflictError when request is already processed', async () => {
      const processed = { ...mockRequest, status: 'approved' as const }
      const requestRepo = makeRepo<VacationRequest>({ findOne: jest.fn().mockResolvedValue(processed) })
      const userRepo = makeRepo<User>()
      const service = new VacationRequestService(requestRepo, userRepo)

      await expect(service.updateStatus(1, { status: 'rejected', comments: 'no' })).rejects.toThrow(ConflictError)
    })

    it('approves a pending request', async () => {
      const updated = { ...mockRequest, status: 'approved' as const }
      const requestRepo = makeRepo<VacationRequest>({
        findOne: jest.fn().mockResolvedValue({ ...mockRequest }),
        save: jest.fn().mockResolvedValue(updated),
      })
      const userRepo = makeRepo<User>()
      const service = new VacationRequestService(requestRepo, userRepo)

      const result = await service.updateStatus(1, { status: 'approved' })
      expect(result.status).toBe('approved')
    })

    it('rejects a pending request with comments', async () => {
      const updated = { ...mockRequest, status: 'rejected' as const, comments: 'No budget' }
      const requestRepo = makeRepo<VacationRequest>({
        findOne: jest.fn().mockResolvedValue({ ...mockRequest }),
        save: jest.fn().mockResolvedValue(updated),
      })
      const userRepo = makeRepo<User>()
      const service = new VacationRequestService(requestRepo, userRepo)

      const result = await service.updateStatus(1, { status: 'rejected', comments: 'No budget' })
      expect(result.status).toBe('rejected')
      expect(result.comments).toBe('No budget')
    })
  })
})

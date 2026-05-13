import { Repository } from 'typeorm'
import { VacationRequest, RequestStatus } from '../entities/VacationRequest'
import { User } from '../entities/User'
import { CreateRequestDto } from '../validators/createRequest.validator'
import { UpdateRequestDto } from '../validators/updateRequest.validator'

export class NotFoundError extends Error {
  statusCode = 404
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
  }
}

export class ConflictError extends Error {
  statusCode = 409
  constructor(message: string) {
    super(message)
    this.name = 'ConflictError'
  }
}

export class ValidationError extends Error {
  statusCode = 400
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class VacationRequestService {
  constructor(
    private readonly requestRepo: Repository<VacationRequest>,
    private readonly userRepo: Repository<User>
  ) {}

  async create(dto: CreateRequestDto): Promise<VacationRequest> {
    const user = await this.userRepo.findOneBy({ id: dto.userId })
    if (!user) throw new NotFoundError(`User with id ${dto.userId} not found`)

    const request = this.requestRepo.create({
      userId: dto.userId,
      user,
      startDate: dto.startDate,
      endDate: dto.endDate,
      reason: dto.reason ?? null,
      status: 'pending',
      comments: null,
    })

    return this.requestRepo.save(request)
  }

  async findAll(filters: { userId?: number; status?: RequestStatus }): Promise<VacationRequest[]> {
    const query = this.requestRepo
      .createQueryBuilder('req')
      .leftJoinAndSelect('req.user', 'user')
      .orderBy('req.createdAt', 'DESC')

    if (filters.userId !== undefined) {
      query.andWhere('req.user_id = :userId', { userId: filters.userId })
    }
    if (filters.status) {
      query.andWhere('req.status = :status', { status: filters.status })
    }

    return query.getMany()
  }

  async updateStatus(id: number, dto: UpdateRequestDto): Promise<VacationRequest> {
    const request = await this.requestRepo.findOne({
      where: { id },
      relations: ['user'],
    })

    if (!request) throw new NotFoundError(`Request with id ${id} not found`)

    if (request.status !== 'pending') {
      throw new ConflictError('Request has already been processed.')
    }

    request.status = dto.status
    request.comments = dto.comments ?? null

    return this.requestRepo.save(request)
  }
}

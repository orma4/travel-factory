import { Request, Response, NextFunction } from 'express'
import { VacationRequestService } from '../services/VacationRequestService'
import { VacationRequestRepository } from '../repositories/VacationRequestRepository'
import { UserRepository } from '../repositories/UserRepository'
import { RequestStatus } from '../entities/VacationRequest'

const requestService = new VacationRequestService(VacationRequestRepository, UserRepository)

export async function createRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const request = await requestService.create(req.body)
    res.status(201).json(request)
  } catch (err) {
    next(err)
  }
}

export async function getRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined
    const status = req.query.status as RequestStatus | undefined
    const requests = await requestService.findAll({ userId, status })

    const response = requests.map((r) => ({
      id: r.id,
      userId: r.userId,
      userName: r.user?.name ?? null,
      startDate: r.startDate,
      endDate: r.endDate,
      reason: r.reason,
      status: r.status,
      comments: r.comments,
      createdAt: r.createdAt,
    }))

    res.json(response)
  } catch (err) {
    next(err)
  }
}

export async function updateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id)
    const updated = await requestService.updateStatus(id, req.body)
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

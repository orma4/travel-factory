export type UserRole = 'requester' | 'validator'
export type RequestStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: number
  name: string
  role: UserRole
}

export interface VacationRequest {
  id: number
  userId: number
  userName: string | null
  startDate: string
  endDate: string
  reason: string | null
  status: RequestStatus
  comments: string | null
  createdAt: string
}

export interface CreateRequestPayload {
  userId: number
  startDate: string
  endDate: string
  reason?: string | null
}

export interface UpdateRequestPayload {
  status: 'approved' | 'rejected'
  comments?: string
}

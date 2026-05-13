import http from './axios'
import type { VacationRequest, CreateRequestPayload, UpdateRequestPayload } from '../types'

export const fetchRequests = (params?: { userId?: number; status?: string }): Promise<VacationRequest[]> =>
  http.get<VacationRequest[]>('/requests', { params }).then((r) => r.data)

export const createRequest = (payload: CreateRequestPayload): Promise<VacationRequest> =>
  http.post<VacationRequest>('/requests', payload).then((r) => r.data)

export const updateRequest = (id: number, payload: UpdateRequestPayload): Promise<VacationRequest> =>
  http.patch<VacationRequest>(`/requests/${id}`, payload).then((r) => r.data)

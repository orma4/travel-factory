import http from './axios'
import type { User } from '../types'

export const fetchUsers = (): Promise<User[]> =>
  http.get<User[]>('/users').then((r) => r.data)

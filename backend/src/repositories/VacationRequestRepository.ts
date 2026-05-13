import { AppDataSource } from '../data-source'
import { VacationRequest } from '../entities/VacationRequest'

export const VacationRequestRepository = AppDataSource.getRepository(VacationRequest)

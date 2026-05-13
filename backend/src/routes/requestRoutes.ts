import { Router } from 'express'
import { createRequest, getRequests, updateRequest } from '../controllers/VacationRequestController'
import { validateBody } from '../middleware/validateRequest'
import { createRequestSchema } from '../validators/createRequest.validator'
import { updateRequestSchema } from '../validators/updateRequest.validator'

const router = Router()

router.get('/', getRequests)
router.post('/', validateBody(createRequestSchema), createRequest)
router.patch('/:id', validateBody(updateRequestSchema), updateRequest)

export default router

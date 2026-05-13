import { z } from 'zod'

export const updateRequestSchema = z
  .object({
    status: z.enum(['approved', 'rejected'], {
      required_error: 'status is required',
      invalid_type_error: 'status must be "approved" or "rejected"',
    }),
    comments: z.string().max(1000).optional(),
  })
  .refine(
    (data) => !(data.status === 'rejected' && !data.comments?.trim()),
    { message: 'comments are required when rejecting a request', path: ['comments'] }
  )

export type UpdateRequestDto = z.infer<typeof updateRequestSchema>

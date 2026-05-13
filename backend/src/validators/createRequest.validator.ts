import { z } from 'zod'

const today = () => new Date().toISOString().split('T')[0]

export const createRequestSchema = z
  .object({
    userId: z.number({ required_error: 'userId is required' }).int().positive(),
    startDate: z
      .string({ required_error: 'startDate is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'startDate must be a date in YYYY-MM-DD format')
      .refine((d) => d >= today(), { message: 'startDate cannot be in the past' }),
    endDate: z
      .string({ required_error: 'endDate is required' })
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'endDate must be a date in YYYY-MM-DD format'),
    reason: z.string().max(500).nullable().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'endDate must be on or after startDate',
    path: ['endDate'],
  })

export type CreateRequestDto = z.infer<typeof createRequestSchema>

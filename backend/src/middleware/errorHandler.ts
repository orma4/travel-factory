import { Request, Response, NextFunction } from 'express'

interface AppError extends Error {
  statusCode?: number
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.statusCode ?? 500
  const message = status === 500 ? 'Internal server error' : err.message
  res.status(status).json({ message })
}

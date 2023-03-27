import { Response } from 'express'

export const handleHttp = (res: Response, error: string, errorRaw?: any) => {
  return res.status(400).json({ ok: false, error, errorRaw })
}

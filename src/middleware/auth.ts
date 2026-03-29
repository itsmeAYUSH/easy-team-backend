import { Request, Response, NextFunction } from 'express'
import { supabase } from '../config/supabase'

export interface AuthRequest extends Request {
  user?: { id: string; role: string }
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }

  const { data: { user } } = await supabase.auth.getUser(token)

  if (!user) {
    res.status(401).json({ error: 'invalid token' })
    return
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  req.user = { id: user.id, role: profile?.role ?? 'employee' }
  next()
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'forbidden' })
      return
    }
    next()
  }
}
import { Response } from 'express'
import { supabase } from '../config/supabase'
import { AuthRequest } from '../middleware/auth'

export async function getUsers(req: AuthRequest, res: Response) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  res.json(data)
}

export async function updateUserRole(req: AuthRequest, res: Response) {
  const { role } = req.body
  const validRoles = ['admin', 'manager', 'employee']

  if (!validRoles.includes(role)) {
    res.status(400).json({ error: 'invalid role' })
    return
  }

  const { data } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', req.params.id)
    .select()
    .single()

  res.json(data)
}
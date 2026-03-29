import { Response } from 'express'
import { supabase } from '../config/supabase'
import { AuthRequest } from '../middleware/auth'

export async function getTasks(req: AuthRequest, res: Response) {
  let query = supabase
    .from('tasks')
    .select('*, projects(name)')
    .order('created_at', { ascending: false })

  if (req.user!.role === 'employee') {
    query = query.eq('assigned_to', req.user!.id)
  }

  const { data } = await query
  res.json(data)
}

export async function getTask(req: AuthRequest, res: Response) {
  const { data } = await supabase
    .from('tasks')
    .select('*, projects(name)')
    .eq('id', req.params.id)
    .single()

  if (!data) {
    res.status(404).json({ error: 'task not found' })
    return
  }

  if (req.user!.role === 'employee' && data.assigned_to !== req.user!.id) {
    res.status(403).json({ error: 'forbidden' })
    return
  }

  res.json(data)
}

export async function createTask(req: AuthRequest, res: Response) {
  const { title, description, project_id, assigned_to } = req.body

  const { data } = await supabase
    .from('tasks')
    .insert({
      title,
      description,
      project_id,
      assigned_to: assigned_to || null,
      status: 'todo',
      created_by: req.user!.id
    })
    .select()
    .single()

  res.status(201).json(data)
}

export async function updateTask(req: AuthRequest, res: Response) {
  const { role, id: userId } = req.user!

  const updates = role === 'employee'
    ? { status: req.body.status }
    : req.body

  let query = supabase
    .from('tasks')
    .update(updates)
    .eq('id', req.params.id)

  if (role === 'employee') {
    query = query.eq('assigned_to', userId)
  }

  const { data } = await query.select().single()
  res.json(data)
}

export async function deleteTask(req: AuthRequest, res: Response) {
  await supabase.from('tasks').delete().eq('id', req.params.id)
  res.json({ success: true })
}
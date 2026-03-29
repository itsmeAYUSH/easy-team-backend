import { Response } from 'express'
import { supabase } from '../config/supabase'
import { AuthRequest } from '../middleware/auth'

export async function getProjects(req: AuthRequest, res: Response) {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  res.json(data)
}

export async function getProject(req: AuthRequest, res: Response) {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (!data) {
    res.status(404).json({ error: 'project not found' })
    return
  }

  res.json(data)
}

export async function createProject(req: AuthRequest, res: Response) {
  const { name, description } = req.body

  const { data } = await supabase
    .from('projects')
    .insert({ name, description, created_by: req.user!.id })
    .select()
    .single()

  res.status(201).json(data)
}

export async function updateProject(req: AuthRequest, res: Response) {
  const { name, description } = req.body

  const { data } = await supabase
    .from('projects')
    .update({ name, description })
    .eq('id', req.params.id)
    .select()
    .single()

  res.json(data)
}

export async function deleteProject(req: AuthRequest, res: Response) {
  await supabase.from('projects').delete().eq('id', req.params.id)
  res.json({ success: true })
}
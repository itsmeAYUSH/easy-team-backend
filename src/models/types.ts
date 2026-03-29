export type Role = 'admin' | 'manager' | 'employee'
export type TaskStatus = 'todo' | 'in_progress' | 'done'

export interface Profile {
  id: string
  full_name: string
  email: string
  role: Role
  created_at: string
}

export interface Project {
  id: string
  name: string
  description?: string
  created_by: string
  created_at: string
}

export interface Task {
  id: string
  project_id: string
  title: string
  description?: string
  status: TaskStatus
  assigned_to?: string
  created_by: string
  created_at: string
}
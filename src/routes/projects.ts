import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth'
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController'

const router = Router()

router.get('/', requireAuth, getProjects)
router.get('/:id', requireAuth, getProject)
router.post('/', requireAuth, requireRole('admin'), createProject)
router.put('/:id', requireAuth, requireRole('admin'), updateProject)
router.delete('/:id', requireAuth, requireRole('admin'), deleteProject)

export default router
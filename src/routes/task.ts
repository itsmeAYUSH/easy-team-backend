import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth'
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController'

const router = Router()

router.get('/', requireAuth, getTasks)
router.get('/:id', requireAuth, getTask)
router.post('/', requireAuth, requireRole('admin', 'manager'), createTask)
router.patch('/:id', requireAuth, updateTask)
router.delete('/:id', requireAuth, requireRole('admin'), deleteTask)

export default router
import { Router } from 'express'
import { requireAuth, requireRole } from '../middleware/auth'
import { getUsers, updateUserRole } from '../controllers/userController'

const router = Router()

router.get('/', requireAuth, requireRole('admin'), getUsers)
router.patch('/:id/role', requireAuth, requireRole('admin'), updateUserRole)

export default router
import express from 'express'
import remediesController from '../controller/remediesController.js'

const router = express.Router()

router.get('/remedies',remediesController.getRemedies)
router.get('/basiccare',remediesController.basicCare)

export default router



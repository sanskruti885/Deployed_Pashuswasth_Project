import express from 'express'
import diseasesController from '../controller/diseasesController.js'

const router  = express.Router()

router.get('/diseases',diseasesController.showDiseases)
export default router;
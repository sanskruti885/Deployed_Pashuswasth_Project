import express from 'express'
import insuranceController from '../controller/insuranceController.js'

const router  = express.Router()

router.get('/insurance',insuranceController.showInsurance)
export default router;
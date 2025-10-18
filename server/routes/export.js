import express from 'express'
import { exportToDOCX, exportToHTML, exportToJSON, exportToPDF, getExportHistory } from '../controllers/exportResume.controller'

const exportRouter = express.Router()

exportRouter.post('/export-pdf',exportToPDF)
exportRouter.post('/export-docs',exportToDOCX)
exportRouter.post('/export-json',exportToJSON)
exportRouter.post('/export-html',exportToHTML)
exportRouter.get('/export-history',getExportHistory)

export default exportRouter

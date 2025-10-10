import express from "express"
import { deleteResume,getPublicResumeById,getResumeById,createResume,updateResume } from "../controllers/resume.controller"

const ResumeRouter = express.Router()

ResumeRouter.post('/create',createResume)
ResumeRouter.get('/:resumeId',getResumeById)
ResumeRouter.get('/public/:resumeId',getPublicResumeById)
ResumeRouter.put('/update/:resumeId',updateResume)
ResumeRouter.delete('/delete/:resumeId',deleteResume)

export default ResumeRouter
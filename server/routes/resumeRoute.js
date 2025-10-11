import express from "express"
import { deleteResume,getPublicResumeById,getResumeById,createResume,updateResume } from "../controllers/resume.controller.js"
import upload from "../middleware/muilter.middleware.js"
import userAuth from "../middleware/auth.middleware.js"
const ResumeRouter = express.Router()

ResumeRouter.post('/create',userAuth,createResume)
ResumeRouter.get('/:resumeId',getResumeById)
ResumeRouter.get('/public/:resumeId',getPublicResumeById)
ResumeRouter.put('/update',upload.single('image'),userAuth,updateResume)
ResumeRouter.delete('/delete/:resumeId',userAuth,deleteResume)

export default ResumeRouter



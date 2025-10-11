import express from "express"
import userAuth from "../middleware/auth.middleware.js"
import { enhanceProffesionalSummary,enhanceJobDescription,uploadResume } from "../controllers/ai.controller.js"
import { updateResume } from "../controllers/resume.controller"

const aiRouter = express.Router()

aiRouter.post('/enhance-pro-sum',userAuth,enhanceProffesionalSummary)
aiRouter.post('/enhance-job-desc',userAuth,enhanceJobDescription)
aiRouter.post('/upload-resume',ProcessingInstruction,updateResume)

export default aiRouter



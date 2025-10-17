import express from "express"
import userAuth from "../middleware/auth.middleware.js"
import { enhanceProffesionalSummary,enhanceJobDescription,updateResume,getATSscore,analyzeAtsScore } from "../controllers/ai.controller.js"
import { updateResume } from "../controllers/resume.controller"

const aiRouter = express.Router()

aiRouter.post('/enhance-pro-sum',userAuth,enhanceProffesionalSummary)
aiRouter.post('/enhance-job-desc',userAuth,enhanceJobDescription)
aiRouter.post('/upload-resume',userAuth,updateResume)
aiRouter.post('/analyze',userAuth,analyzeAtsScore)
aiRouter.get('/ats',userAuth,getATSscore)


export default aiRouter



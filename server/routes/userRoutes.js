import express from 'express'
import { registerUser,loginUser,getUserById, getUserResumes } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data', userAuth,getUserById)
userRouter.get('./resumes', userAuth,getUserResumes)

export default userRouter
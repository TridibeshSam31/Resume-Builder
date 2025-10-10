


//create krna hai new resume
//gat krna hai saare resume (already done in user.conytroller.js)
//get a single resume
//update krna hai resume
//delete krna hai resume
//ai ka tadka bhi daalana hai resume mai so uske liye gemini start krna hai
//get resume by id public /api/resume/public

import Resume from "../models/resume.model.js"


export const createResume = async (req,res) =>{
    try {
        //kya chaiye resume create krne ke liye
        //userId chaiye 
        //title chaiye 
        const {userId} =req.userId
        const{title} = req.body

        if(!userId){
            return res.status(400).json({message:"user not found kindly register"})
        }
        if(!title){
            return res.status(400).json({message:"title is required"})
        }
        const newResume =  await Resume.create({
            userId,
            title
        })

        return res.status(201).json({message:'resume created successfully',resume:newResume})

        
    } catch (error) {
        return res.status(400).json({message:"resume not created"},error.message)
    }
}

export const getResumeById = async (req,res)=>{
    try {
        const {resumeId} = req.params
        const {userId} = req.userId
        const resume = await Resume.findOne({
            userId:userId,
            _id:resumeId
            
        })
        if(!resume){
            return res.status(404).json({message:"resume not found"})
        }
        resume.__v=undefined //yeh mongoose ke verson ko hata dega
        resume.createdAt=undefined
        resume.updatedAt=undefined
        return res.status(200).json({resume})
    } catch (error) {
         return res.status(400).json({message:"resume not created"},error.message)
    }
}


export const deleteResume = async (req,res)=>{
    try {
        const {resumeId} = req.params
        const {userId} = req.userId
        const resumeDelete = await Resume.findOneAndDelete({
            userId:userId,
            _id:resumeId
        })
        return res.status(200).json({message:"resume deleted Successfully",resume:resumeDelete})
    } catch (error) {
        return res.status(400).json({message:"resume not deleted"},error.message)
    }
}

export const getPublicResumeById = async (req,res)=>{
    try {
       const {resumeId} = req.params
       const resume = await Resume.findOne({
        public:true, //sirf wahi wale resume milenge jo publicaly posted honge
        _id:resumeId
       }) 
       if(!resume){
        return res.status(404).json({message:"resume not found"})
       }

    } catch (error) {
        return res.status(400).json({message:"resume not created"},error.message)
    }
}


//update resume yahi hai main wala part 
export const updateResume = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
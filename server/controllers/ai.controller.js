

//controller for enhancing a resume's professional summary


import openai from "../config/ai.js";
import Resume from "../models/resume.model.js";

//POST:/api/ai/enhance-pro-sum

export const enhanceProffesionalSummary = async (req,res)=>{
    try {
        const {userContent} = req.body;
        if (!userContent) {
            return res.json({
                message:'Missing required fields'
            })
    
        }
        const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            { role: "system", content: "You are an expert in resume writing.Your task is to enhance the professional summary of a resume The summary shpuld be 1-2 sentences also highlighting key skills,experience and carrer objectives.Make it compelling and ATS-friendly.and only return text no options or anything else" },
            {
                role: "user",
                content: userContent,
            },
        ],
       });
       const enhancedContent = response.choices[0].message.content
       return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:"error in api"})
    }
}

//for enhancing a resume's job description
//post :/api/ai/enhance-job-description

export const enhanceJobDescription = async (req,res)=>{
    try {
        const {userContent} = req.body;
        if (!userContent) {
            return res.json({
                message:'Missing required fields'
            })
    
        }
        const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            { role: "system", content: "You are an expert in resume writing.Your task is to enhance the job description of a resume The job description should be 1-2 sentences also highlighting key responsibilities and achievements.Use action verbs and quantifirable results where possible.Make it ATS-friendly.and only return text no options or anything else" },
            {
                role: "user",
                content: userContent,
            },
        ],
       });
       const enhancedContent = response.choices[0].message.content
       return res.status(200).json({enhancedContent})
    } catch (error) {
        return res.status(400).json({message:"error in api"})
    }
}

//uploading resume to the database
//POST:/api/ai/upload-resume

export const uploadResume = async (req,res)=>{
    try {
       const {resumeText,title} = req.body
       const userId = req.userId
       if (!resumeText) {
        return res.status(400).json({message:"Missing Required Fields"})
       }
       const systemPrompt = "You are an expert AI agent to extract data from resume"
       const userPrompt = `extract data from this resume:${resumeText } 
       provide data in the following JSON format with no additional text before or after: 
       {
       professional_summary:{
        type:String,
        default:""
    },
    skills:[{
        type:String
    }],//array of strings
    
    personal_info:{
        image:{
            type:String,
            default:''
        },
        full_name:{
            type:String,
            default:''
        },
        profession:{
            type:String,
            default:''
        },
        email:{
            type:String,
            default:''
        },
        phone:{
            type:String,
            default:''
        },
        location:{
            type:String,
            default:''
        },
        ConnectMeAt:{
            enum:["email","phone",'linkedin','github','twitter','instagram'],
            required:true,
            default:'email'
        },

        experience:[
            {
                company:{
                    type:String,
                },
                position:{
                    type:String,
                },
                start_date:{
                    type:String,
                },
                end_date:{
                    type:String,
                },
                description:{
                    type:String,
                },
                is_current:{
                    type:Boolean
                }

                
            }
        ],
        project:[
            {
                name:{
                    type:String
                },
                type:{
                    type:String
                },
                description:{
                    type:String
                }
            }
        ],
        education:[
            {
                institution:{
                    type:String
                },
                degree:{
                    type:String
                },
                field:{
                    type:String
                },
                graduation_date:{
                    type:String
                },
                gpa:{
                    type:String
                }
            }
        ]
       } `
        const response = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: userPrompt,
            },
        ],
        response_format:{type:'json_object'}
       });
       const extractedData = response.choices[0].message.content
       const parsedData = JSON.parse(extractedData)
       const newResume = await Resume.create({
        userId,
        title,
        ...parsedData
       })
       res.json({resumeId:newResume._id})

    } catch (error) {
        return res.status(400).json({
            message:'Resume not uploaded to database'
        })
    }
}



//ats score ko analysize krne ke liye controller likhna hai soooo

//POST : /api/ats/analyze/:resumeId

export const analyzeAtsScore = async(req,res)=>{
    try {
        const {resumeId} = req.params
        const{userId} = req.userId

        const resume = await Resume.findById({
            _id:resumeId,
            userId:userId
        });
        if (!resume) {
            return res.status(404).json({
                message:"resume not found"
            })
        }

        //next yeh sochna hai ki agar humko score generate krna hai toh kya kya chaiye hoga
        //since hum ai ki help le rhe hai so humme prompt bhi dena hoga system ko prompt dena hoga aur ek user ka prompt hoga
        //jaise humne upar kiya tha 
        //resume ke analysis ke liye humko resume ka text bhi dena hoga
        

        const systemPrompt = ''
        const userPrompt = ``
        //ok ab iske baad 
        //fir openAi api ko call krenge
        //aur response ko pass krenge

    } catch (error) {
      console.error("ATS Analysis Error:",error)
      return res.status(500).json({
        message:"Error analyzing resume",
        error:error.message
      })
    }
}
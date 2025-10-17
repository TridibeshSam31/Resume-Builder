

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
        
        const resumeText = `Professional Summary: ${resume.professional_summary}
          skills:${resume.skills.join(',')}
          
          Experience: ${resume.experience.map(exp => `
                ${exp.position} at ${exp.company}
                ${exp.description} `).join('\n')}
                
            Education : ${resume.education.map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`).join('\n')}    
            
            Projects:
            ${resume.project.map(proj => `
                ${proj.name}: ${proj.description}
            `).join('\n')}
            `;

        const systemPrompt = `You are an expert ATS (Applicant Tracking System) analyzer. 
        Analyze the resume for:
        1. Keyword optimization (industry-specific keywords, action verbs)
        2. Formatting issues (special characters, complex tables, headers/footers)
        3. Content quality (quantifiable achievements, clarity, relevance)
        4. Overall ATS compatibility
        
        Provide scores (0-100) for each category and overall score.
        Provide specific, actionable suggestions for improvement.
        Identify missing keywords that would improve ATS ranking.
        `;

        const userPrompt = `Analyze this resume and provide detailed ATS scoring:
        
        ${resumeText}
        
        Return ONLY valid JSON in this exact format:
        {
            "overall_score": 85,
            "keyword_score": 80,
            "formatting_score": 90,
            "content_score": 85,
            
            "suggestions": [
                {
                    "type": "critical",
                    "category": "keywords",
                    "message": "Add more action verbs like 'Led', 'Implemented', 'Optimized'"
                }
            ],
            "missing_keywords": ["leadership", "project management", "agile"]
        }`;
        //ok ab iske baad 
        //fir openAi api ko call krenge
        //aur response ko pass krenge
        // Update resume with ATS analysis

        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: 'json_object' }
        });

        const analysisResult = JSON.parse(response.choices[0].message.content);

        resume.ats_analysis = {
            last_analyzed: new Date(),
            overall_score: analysisResult.overall_score,
            keyword_score: analysisResult.keyword_score,
            formatting_score: analysisResult.formatting_score,
            content_score: analysisResult.content_score,
            suggestions: analysisResult.suggestions,
            missing_keywords: analysisResult.missing_keywords,
            job_match_score: analysisResult.job_match_score
        };

        await resume.save();

        return res.status(200).json({
            message: "ATS analysis completed",
            analysis: resume.ats_analysis
        });


    } catch (error) {
      console.error("ATS Analysis Error:",error)
      return res.status(500).json({
        message:"Error analyzing resume",
        error:error.message
      })
    }
}


//ats score create kr diya ab get krenge 

export const getATSscore = async(req,res)=>{
    try {
        const{resumeId} = req.params
        const {userId} = req.userId
        
        const findResume = await Resume.findById({
            _id: resumeId,
            userId: userId
        }.select('ats_analysis'))

         if (!findResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        if (!findResume.ats_analysis || !findResume.ats_analysis.last_analyzed) {
            return res.status(404).json({ 
                message: "No ATS analysis found. Please analyze first." 
            });
        }

        return res.status(200).json({
            analysis:findResume.ats_analysis
        });
    } catch (error) {
        console.error("Get ATS Score Error:", error);
        return res.status(500).json({ 
            message: "Error fetching ATS score", 
            error: error.message 
        });
    }
}
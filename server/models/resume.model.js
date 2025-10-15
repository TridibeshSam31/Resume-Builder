import mongoose from "mongoose"

const ResumeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    title:{
        type:String,
        defalut:'untitled Resume'
    },
    public:{
        type:Boolean,
        default:false
    },
    template:{
        type:String,
        default:"classic"
    },
    accent_color:{
        type:String,
        default:"#3B82F6"
    },
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
        ],
        //for ats score

        ats_analysis:{
        last_analyzed:{
            type:Date
        },
        overall_score:{
            type:Number,
            min:0,
            max:100
        },
        keyword_score:{
            type:Number,
            min:0,
            max:100
        },
        formatting_score:{
            type:Number,
            min:0,
            max:100
        },
        content_score:{
            type:Number,
            min:0,
            max:100
        },
        suggestions:[{
            type:{
                type:String,
                enum:['critical','warning','info']
            },
            category:{
                type:String,
                enum:['keywords','formatting','content','skills']
            },
            message:{
                type:String
            }
        }],
        missing_keywords:[{
            type:String
        }],
        job_match_score:{
            type:Number,
            min:0,
            max:100
        }
    },
    
    // NEW: Export History
    export_history:[{
        format:{
            type:String,
            enum:['pdf','docx','html','json','latex']
        },
        exported_at:{
            type:Date,
            default:Date.now
        },
        file_url:{
            type:String
        }
    }]


    }
       
    
},{timestamps:true,minimize:false}) //minimize false is used to store empty objects as well in the database

const Resume = mongoose.model("Resume",ResumeSchema)

export default Resume

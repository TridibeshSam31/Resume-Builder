import user from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const generateToken = (userId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'10d'})
    return token
}





//register krenge user ko
export const registerUser = async (req,res)=>{
   
    try {
        const {name,email,password} = req.body

        if(!name||!email||!password){
            return res.status(400).json({message:"please enter all the fields"})

        }
        //check user already exists
        const existingUser = await user.findOne({
            email:email
        })
       if(existingUser){
        return res.status(400).json({message:"user already exists"})
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const newUser = await user.create({
        name,
        email,
        password:hashedPassword

       })

       //return success message
       const token = generateToken(newUser._id)
       newUser.password=undefined //password ko undefined kr diya taki response mai na jaaye
       return res.status(201).json({message:"user registered Successfully",token,user:newUser})



       


    } catch (error) {
        return res.status(400).json({message:"user not registered"},error.message)
    }

    
}

export const loginUser = async(req,res)=>{
    try {
        //login krne ke liye 
        const {email,password} = req.body
        if(!email||!password){
            return res.status(400).json({message:"please enter all the fields"})
        }
        const user = await user.findOne({
            email:email
        })
        if(!user){
            return res.status(400).json({message:"user not found,please register"})

        }
        //user mil gaya ab password check krenge 
        const isPasswordMatched = await bcrypt.compare(password,user.password)
        if(!isPasswordMatched){
            return res.status(400).json({message:"invalid credentials"})
        }
        //return success message
        const token = generateToken(user._id)
        user.password=undefined
        return res.status(200).json({message:"user logged in successfully",token,user:newUser})
    } catch (error) {
        return res.status(400).json({message:"user not registered"},error.message)
        
    }
}


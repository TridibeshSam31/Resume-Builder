import mongoose from "mongoose"
import bcrypt from "bcryptjs"

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})


//yahin pr password ko compare krne ke liye method likh deta hu controller ko clean rkhna hai

userSchema.methods.matchPassword() = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
const user = mongoose.model("User",userSchema)

export default user
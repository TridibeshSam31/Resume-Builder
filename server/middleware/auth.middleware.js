
import jwt from "jsonwebtoken"

const userAuth = async (request,response,next)=>{
    const {token} = request.headers.authorization //yeh header mai bheja jayega client side mai

    if(!token){
        return response.json({success:false , message:'Not Authorized.Login Again'})

    }
    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET)
        if(tokenDecode.id){
            request.body.userId = tokenDecode.userId

        }else{
            return response.json({success:false , message:'Not Authorized.Login Again'})

        }

        next();
        
    } catch (error) {
        response.json({success:false , message:error.message})
    }
}

export default userAuth;

import { getSession } from "../model/session/SessionModel.js";
import { getOneAdmin, getUserByEmail } from "../model/userModel.js";
import { accessJWTDecode, refreshJWTDecode, signAccessJwt } from "../utils/jwtHelper.js"


export const userAuth=async (req, res, next)=>{
try {
    const {authorization}= req.headers;
    const decoded= accessJWTDecode(authorization)
 console.log(decoded)
    if(decoded?.email){
     const tokenExist= await getSession({token:authorization})
     if(tokenExist?._id){
        const user= await getUserByEmail(decoded.email);
        if(user?._id){
         user.password=undefined;
         req.userInfo= user;
         return  next();
    }
     }
    }
 
    throw new Error("invalid token, unauthorized")

   //validate accessJWT is valid
} catch (error) {
   console.log(error)
   error.errorCode=401;

    if(error.message.includes("jwt expired")){
        error.errorCode=403;
    }
    next(error)
}

}


export const refreshAuth=async (req, res, next)=>{
   try {
       const {authorization}= req.headers;
       const decoded= refreshJWTDecode(authorization)
    console.log(decoded)
       if(decoded?.email){
           const user= await getOneAdmin({
            email:decoded.email,
            refreshJWT: authorization,
         });
           if(user?._id){
         // create new accessjwt and return,
          const accessJWT= signAccessJwt({email:user.email})
          return res.json({
            status:"success",
            accessJWT,
          })
       }
        }
        throw new Error("invalid token, unauthorized")
       }
    
   
      
   
      //validate accessJWT is valid
    catch (error) {
      error.errorCode=401;
   
       if(error.message.includes("jwt expired")){
           error.errorCode=403;
       }
   }
}
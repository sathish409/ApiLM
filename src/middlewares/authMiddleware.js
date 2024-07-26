
import { getSession } from "../model/session/SessionModel.js";
import { getUserByEmail } from "../model/userModel.js";
import { accessJWTDecode } from "../utils/jwtHelper.js"


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
   error.errorCode=401;

    if(error.message.includes("jwt expired")){
        error.errorCode=403;
    }
}
}
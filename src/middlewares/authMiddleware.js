
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
         next();
    }
     }
    }
 next({
    message:"invalid token, unauthorized",
    errorCode:403,

 })

   //validate accessJWT is valid
} catch (error) {
    if(error.message.includes("jwt expired")){
        error.errorCode=401;
    }
}
}
import jwt from 'jsonwebtoken'
import { createSession } from '../model/session/SessionModel.js';
import { updateRefreshJWT } from '../model/userModel.js';


//access jwt : session table, exp:15min
export const signAccessJwt=(obj)=>{
        const token=  jwt.sign(obj, process.env.JWT_ACCESS_SECRET, {
            expiresIn:"15m",
        })
        createSession({token})
        return token;
  
    }

export const accessJWTDecode= (accessJWT)=>{
    return jwt.verify(accessJWT, process.env.JWT_ACCESS_SECRET)
}

//refresh jwt: user table, exp:30days
export const signRefreshJwt=(email)=>{
    try {
        const token=jwt.sign({email}, process.env.JWT_REFRESH_SECRET, {
            expiresIn:"30d",}
        )
        updateRefreshJWT(email, token)
        return token
    } catch (error) {
       next(error) 
    }
  
}

export const signJWTs=(email)=>{
    return {
        accessJWT :signAccessJwt({email}),
        refreshJWT :signRefreshJwt(email),

    }
}
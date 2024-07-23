import userSchema from './userSchema.js'

//create
export const createUser=(userObj)=>{
return userSchema(userObj).save()
}


//read
export const getUserByEmail=(email)=>{
    return userSchema.findOne({email})
    }



//add refrehJWT

export const updateRefreshJWT= async(email, refreshJWT)=>{
    return await userSchema.findOneAndUpdate({email}, {refreshJWT})
}

//update
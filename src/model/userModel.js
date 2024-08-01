import userSchema from './userSchema.js'

//create
export const createUser=(userObj)=>{
return userSchema(userObj).save()
}


//read
export const getUserByEmail=(email)=>{
    return userSchema.findOne({email})
    }

    export const getOneAdmin=(filter)=>{
        return userSchema.findOne(filter)
        }

// delete refreshJWT

export const updateRefreshJWTByEmail=async(email, refreshJWT)=>{
    return await userSchema.findOneAndUpdate({email}, { refreshJWT })
    }






//add refrehJWT

export const updateRefreshJWT= async(email, refreshJWT)=>{
    return await userSchema.findOneAndUpdate({email}, {refreshJWT})
}

//update
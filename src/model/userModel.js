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

//get all students 

export const getManyStudents=async()=>{

    const selectedProporties = {
        _id: 1,
      status: 1,
      role: 1,
      fname:1, 
      lname: 1,
      email: 1,
      phone: 1,
      createdAt: 1,
    }
    return await userSchema.find({}, selectedProporties)
}
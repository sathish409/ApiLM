import {mongoose} from 'mongoose'

const userSchema= new mongoose.Schema({
status:{
    type:String,
    default:"active",
},
role:{
    type:String,
    default:"student"

},
    fname:{
        type:String,
        required:true,
    },
    
    lname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        index:1,
        required:true,
    },
    phone:{
        type:String,

    },
    password:{
        type:String,
        required:true,
    },
    refreshJWT:{
        type:String,
        default:"",
    },
 
},
{
    timestamps:true,
})

export default mongoose.model("User",userSchema)// users
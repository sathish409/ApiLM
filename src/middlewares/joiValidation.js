import Joi from 'joi'

const SHORTSTR=  Joi.string()
const SHORTSTRREQUIRED=  Joi.string().required()
const LONGSTR=  Joi.string().max(500)
const LONGSTRREQUIRED=  Joi.string().max(5000).required()
const NUMBERREQUIRED=  Joi.number()


export const validationProcessor= (schemaObj, req, res, next)=>{
    try {
        // model what your validation is
        
        const schema=Joi.object(schemaObj)
     
         const {error}= schema.validate(req.body) 
        if(error){
         return res.json({
             status:"error",
             message:error.message,
         })
        }
        next();
     
         } catch (error) {
            console.log(error)
         }
}



export const newUserValidation= (req, res, next)=>{
    try {
   // model what your validation is
   
   const schema=Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email({minDomainSegments:2}).required(),
    phone: Joi.number(),
    password: Joi.string().required(),
   })

    const {error}= schema.validate(req.body) 
   if(error){
    return res.json({
        status:"error",
        message:error.message,
    })
   }
   next();

    } catch (error) {
       console.log(error)
    }
}


export const loginValidation= (req, res, next)=>{
    try {
   // model what your validation is
   
   const schema=Joi.object({
    email: Joi.string().email({minDomainSegments:2}).required(),
    password: Joi.string().required(),
   })

    const {error}= schema.validate(req.body) 
   if(error){
    return res.json({
        status:"error",
        message:error.message,
    })
   }
   next();

    } catch (error) {
       console.log(error)
    }
}

//===books====

export const newBookValidation= (req, res, next)=>{

    const schemaObj={ 
        thumbnail:LONGSTRREQUIRED,
        name:SHORTSTRREQUIRED,
        author:SHORTSTRREQUIRED,
        publishYear:NUMBERREQUIRED,
        isbn:SHORTSTRREQUIRED,
        description:LONGSTRREQUIRED
    }
     validationProcessor(schemaObj, req, res, next)
}

export const updateBookValidation= (req, res, next)=>{

    const schemaObj={ 
        status:SHORTSTRREQUIRED,
        _id:SHORTSTRREQUIRED,
        thumbnail:LONGSTRREQUIRED,
        name:SHORTSTRREQUIRED,
        author:SHORTSTRREQUIRED,
        publishYear:NUMBERREQUIRED,
        description:LONGSTRREQUIRED
    }
     validationProcessor(schemaObj, req, res, next)
}


//======burrow validation

export const newBurrowValidation= (req, res, next)=>{

    const schemaObj={ 
        bookId:SHORTSTRREQUIRED,
        bookName:SHORTSTRREQUIRED,
        thumbnail:LONGSTRREQUIRED,
        userId:SHORTSTRREQUIRED,
        userName:SHORTSTRREQUIRED,
    
    }
     validationProcessor(schemaObj, req, res, next)
}

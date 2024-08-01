

import BookSchema from './BookSchema.js'

//create
export const createBook=(bookObj)=>{
return BookSchema(bookObj).save()
}


//read
export const getAllBooks=()=>{
    return BookSchema.find()
    }
export const getABook=(filter)=>{
    return BookSchema.findOne(filter)
    }

//delete
export const deleteBook=(filter)=>{
    return BookSchema.findOneAndDelete(filter)
    }




//update
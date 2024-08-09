

import BookSchema from './BookSchema.js'

//create
export const createBook=(bookObj)=>{
return BookSchema(bookObj).save()
}


//read
export const getAllBooks=()=>{
    return BookSchema.find()
    }

    export const getABookById=(_id)=>{
        return BookSchema.findById(_id)
        }
export const getABook=(filter)=>{
    return BookSchema.findOne(filter)
    }


    //update
    export const UpdeteABookById=({_id, ...rest})=>{
        return BookSchema.findByIdAndUpdate(_id, rest)
        }

//delete
export const deleteBook=(_id)=>{
    return BookSchema.findOneAndDelete(_id)
    }





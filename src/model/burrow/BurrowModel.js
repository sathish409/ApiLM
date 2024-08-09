

import BurrowSchema from './BurrowSchema.js'

//create
export const createBurrow=(obj)=>{
return BurrowSchema(obj).save()
}


//read
export const getABurrow=(filter)=>{
    return BurrowSchema.findOne(filter)

    }
    export const getManyBurrow=(filter)=>{
        return BurrowSchema.find(filter)
    
        }


//delete
export const deleteBurrow=(filter)=>{
    return BurrowSchema.findOneAndDelete(filter)
    }




//update

export const updateBurrow=(filter, update)=>{
    return BurrowSchema.findOneAndUpdate(filter, update)
    }
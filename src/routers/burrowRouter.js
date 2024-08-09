import express from 'express'
import { createBurrow, getABurrow, getManyBurrow } from '../model/burrow/BurrowModel.js';
import { newBurrowValidation } from '../middlewares/joiValidation.js';
import { UpdeteABookById } from '../model/book/BookModel.js';

const router = express.Router()

router.get("/", async(req, res, next)=>{
    try {
        const {_id} = req.params

        const {role} = req.userInfo

        //if admin request, return all the burrow history, if logedin user may request then retun their burrow only based on the userId in burrow table 
     const burrowedBooks = role === "admin" ?
      await getManyBurrow({}) 
      :
      await getManyBurrow({userId:_id})
      

      burrowedBooks.length ?
       res.json({
        status:"success",
        message:"Here is the list of burrow history"
       })
       :
       res.json({
        status:"error",
        message:"Unable to burrowed this book, please contact administration"
       })



        
    } catch (error) {
        next(error)
    }
})

router.post("/", newBurrowValidation, async(req, res, next)=>{
    try {
        const numberOfDaysToReturn= 15
        let dueDate = new Date()

        dueDate.setDate(dueDate.getDate() + numberOfDaysToReturn)
       const result =await createBurrow({...req.body, dueDate}) ;
    

       if( result?._id){
        //books is available to false
        await UpdeteABookById({
            _id: req.body.bookId,
            isAvailable: false,
            dueDate,
        })
        res.json({
            status:"success",
            message:"You have successfully burrowed this book, for more info check your burrow history"
           })
       }

    
       res.json({
        status:"error",
        message:"Unable to burrowed this book, please contact administration"
       })



        
    } catch (error) {
        next(error)
    }
})

export default router;
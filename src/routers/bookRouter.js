import express from 'express'
import { createBook, getAllBooks } from '../model/book/BookModel.js'
import { userAuth } from '../middlewares/authMiddleware.js'
import { Error } from 'mongoose'
import { newBookValidation } from '../middlewares/joiValidation.js'

const router= express.Router()

router.get("/", async(req, res, next)=>{
    try {
        const books = await getAllBooks()
      return  res.json({
        status:"success",
        message:"Here are the books",
     books,
     
       }) 
      
    } catch (error) {
        next(error)
    }
})


//private endpoints

router.post("/", userAuth,newBookValidation, async(req, res, next)=>{
    try {
        if(req.userInfo?.role !=="admin"){
            throw new Error("You do not have permission to this api")
        }
        const books = await createBook(req.body)
        console.log(books)
        books?._id 
        ? res.json({
        status:"success",
        message:"New book has been added successfully",
        books,
       }) 
       : res.json({
        status:"error",
        message:"Unable to add the book",
        books,
       })

      
    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection")){
            error.message="Book with this isbn already exist, please change the isbn"
            error.errorCode=200;
        }
        next(error)
        next(error)
    }
})
export default router;
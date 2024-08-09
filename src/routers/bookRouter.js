import express from 'express'
import { createBook, deleteBook, getABook, getABookById, getAllBooks, UpdeteABookById } from '../model/book/BookModel.js'
import { adminAuth, getUserFromAccessJwt, userAuth } from '../middlewares/authMiddleware.js'
import { Error } from 'mongoose'
import { newBookValidation, updateBookValidation } from '../middlewares/joiValidation.js'

const router= express.Router()

router.get("/:_id?", async(req, res, next)=>{

    try {
        const {authorization}=req.headers
  
      
        let filter= {status:"active"}
        if(authorization){
            const user =await getUserFromAccessJwt(authorization)
            if(user?.role === "admin"){
                filter= {}
             
            }
        }
       
        const {_id}= req.params

        const books = _id ? await getABook({...filter, _id})
                          : 
                          await getAllBooks(filter)


      
     
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


router.put("/", adminAuth,updateBookValidation, async(req, res, next)=>{
    try {
       
        const books = await UpdeteABookById(req.body)
        console.log(books)
        books?._id 
        ? res.json({
        status:"success",
        message:"Book has been updated successfully",
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
router.delete("/:_id", adminAuth, async(req, res, next)=>{
    try {
       const {_id} = req.params
        const books = await deleteBook(_id)
        
        books?._id 
        ? res.json({
        status:"success",
        message:"Book has been deleted successfully",
       }) 
       : res.json({
        status:"error",
        message:"Unable to delete the book",
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
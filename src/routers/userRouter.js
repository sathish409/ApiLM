import express from 'express';
import { createUser, getManyStudents, getUserByEmail, updateRefreshJWTByEmail } from '../model/userModel.js';
import { comparePassword, hashPassword } from '../utils/bcryptjs.js';
import { loginValidation, newUserValidation } from '../middlewares/joiValidation.js';
import {  signJWTs } from '../utils/jwtHelper.js';
import { adminAuth, refreshAuth, userAuth } from '../middlewares/authMiddleware.js';
import { deleteSession } from '../model/session/SessionModel.js';
const router= express.Router()
router.post("/", (req, res, next) => {
    try {
      res.json({
        status: "success",
        message: "to do create new user user",
      });
    } catch (error) {
      next(error);
    }
  });

router.post("/login", loginValidation, async(req, res, next)=>{
    try {
    const {email, password}=req.body
    //get user by email
     const user= await getUserByEmail(email)
    //  console.log(user)

     if(user?._id){
//check if password from db and plain text match
const isMatched= comparePassword(password, user.password)
if(isMatched){
    //jwts

    const jwts= signJWTs(user.email)
    console.log(jwts)
    return res.json({
        status:"success",
        message:"login successfully",
        jwts,
    })
   

}

}
res.json({
    status:"error",
    message:"invalid login details",
   }) 
    } catch (error) {
        next(error)
    }
})

router.post("/logout", async(req, res, next)=>{
    try {
    const {accessJWT, email}=req.body

    //delete from session table
    accessJWT && (await deleteSession({accessJWT}))

  //update from user table
    email &&  ( await updateRefreshJWTByEmail(email, ""))


    
    
res.json({
    status:"success",
    message:"logout successfully",
   }) 
    } catch (error) {
        next(error)
    }
})

router.post("/admin-user", newUserValidation, async (req, res, next)=>{
    try {
        console.log(req.body);
        req.body.password= hashPassword(req.body.password)
        req.body.role="admin";

        const user= await createUser(req.body)
        if(user?._id){
           return res.json({
                status:"success",
                message:"created admin user successfully",
               }) 
        }
        res.json({
            status:"error",
            message:"unable to create the admin user",
           }) 
        
    } catch (error) {
        if(error.message.includes("E11000 duplicate key error collection")){
            error.message="user already exist with this email please use another email"
            error.errorCode=200;
        }
        next(error)
    }

})

router.get("/", userAuth, (req, res, next)=>{
    try {
      return  res.json({
        status:"success",
        message:"Here is the user Info",
      user: req.userInfo,
     
       }) 
      
    } catch (error) {
        next(error)
    }
})


router.delete("/", (req, res, next)=>{
    try {
       res.json({
        status:"success",
        message:"from delete",
       }) 
    } catch (error) {
        next(error)
    }
})

router.get("/all-users", adminAuth, async(req, res, next)=>{

    try {

        const users = await getManyStudents()
      return  res.json({
        status:"success",
        message:"Here is the students Info",
        users,
     
       }) 
      
    } catch (error) {
        next(error)
    }
})

router.get("/get-accessjwt", refreshAuth);


export default router;
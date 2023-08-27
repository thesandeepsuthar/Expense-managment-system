const express=require('express')
const {loginController,registerController}=require('../controller/userController')

const router=express.Router()

//post route || loggin 
router.post('/login',loginController)

//post||register user
router.post('/register',registerController)
module.exports=router
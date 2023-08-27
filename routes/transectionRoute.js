const express=require('express')
const { addTransection, getAllTransection,editTransection ,deleteTransection} = require('../controller/transectionCtrl')


const router=express.Router()
//routes
//add transection port method
router.post('/add-transection',addTransection)
//edit transection port method
router.post('/edit-transection',editTransection)

//delete transection port method
router.post('/delete-transection',deleteTransection)

//get transection 
router.post('/get-transection',getAllTransection,deleteTransection);


module.exports=router
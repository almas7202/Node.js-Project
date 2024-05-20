import express from 'express'
import { createCategory,getCategory,updateCategory } from "../controller/categoryController"
import userRole from '../middlewear/admin'
import userAuth from '../middlewear/auth'

const routes = express.Router()
routes.route('/newCategory').post(userAuth,userRole,createCategory)
routes.route('/getCategory').get(userAuth,userRole,getCategory)
routes.route('/updateCategory/:id').put(userAuth,userRole,updateCategory)

export default routes
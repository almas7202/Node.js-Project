import { createProduct,getProduct,updateProduct } from "../controller/productController";
import express from 'express'
import userRole from "../middlewear/admin";
import userAuth from "../middlewear/auth";


const routes = express.Router()
routes.route('/newProduct').post(userAuth,userRole,createProduct)
routes.route('/getProduct').get(userAuth,userRole,getProduct)
routes.route('/updateProduct/:id').put(userAuth,userRole,updateProduct)


export default routes;  
import { createProduct,getProduct,updateProduct } from "../controller/productController";
import express from 'express'
import userRole from "../middlewear/admin";
import userAuth from "../middlewear/auth";
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static'); // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // File size limit (optional)
})

const routes = express.Router()
routes.route('/newProduct').post(upload.array("product_images",4),userAuth,userRole,createProduct)
routes.route('/getProduct').get(userAuth,userRole,getProduct)
routes.route('/updateProduct/:id').put(userAuth,userRole,updateProduct)


export default routes;  
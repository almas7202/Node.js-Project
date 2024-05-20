import express from 'express'
import { createInvoice } from '../controller/invoiceController'
import userRole from '../middlewear/admin'
import userAuth from '../middlewear/auth'

const routes = express.Router()
routes.route('/newInvoice').post(userAuth,userRole,createInvoice)


export default routes
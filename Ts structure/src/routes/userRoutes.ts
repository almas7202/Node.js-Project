import express from 'express'
import { createUser, userLogin } from '../controller/userController'
import userAuth from '../middlewear/auth'
const routes = express.Router()
routes.route('/newUser').post(createUser)
routes.route('/userVerify').post(userLogin)

export default routes
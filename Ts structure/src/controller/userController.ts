import { Request,Response, json } from "express"
import userModel from "../models/userSchema"
import Joi from "joi"
import { uservalidate } from "../models/userSchema"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req: Request, res: Response) => {
    const { error } = uservalidate.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    let user = await userModel.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User Alredy Register')
    

    let { username, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password,salt)
    user = await userModel.create({
        username,
        email,
        password
    })
   res.send('Succesfully created User')
}

export const userLogin = async (req: Request, res: Response) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email or password incorrect');
    }

    if (!user.password) {
        return res.status(400).send('User password not set');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(validPassword);
    
    if (!validPassword) {
        return res.status(400).send('Email or password incorrect');
    }
    const token = jwt.sign({ _id: user._id,isAdmin:user.isAdmin}, 'jwtPrivateKey', { algorithm: "HS256" });
    res.status(200).header('x-auth-token', token).send(token)
   
};

function validate(req:Request){
    const uservalidate = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required().min(8).max(16)
    })
    return uservalidate.validate(req)
}



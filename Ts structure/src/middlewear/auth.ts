import { Request,Response,NextFunction } from "express";
import { func } from "joi";
import jwt from "jsonwebtoken";

const userAuth = async(req:Request,res:Response,next:NextFunction) =>{

    const token = req.headers.authorization
    if(!token) return res.status(401).send('Access Denied Token is not Provided')

    jwt.verify(token,'jwtPrivateKey',function(err,decode){
        if(err){
            res.status(401).send('unauthoization')
        }else{
            next()
        }
    })
}

export default userAuth
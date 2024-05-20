import { Request,Response,NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'


const userRole = async(req:Request,res:Response,next:NextFunction) =>{
    const token = req.headers.authorization
    if(!token) return res.status(401).send('Token is not Provided')
    
    jwt.verify(token,'jwtPrivateKey',function(err,decoded){
        if(err){
            res.status(401).send('unauthoization')
        }else{
            const decodedJwt = decoded as JwtPayload
            console.log(decodedJwt);
            if(decodedJwt.isAdmin){
                next()
            }else{
                res.send('Access Denied')
            }
        }
    })
}

export default userRole
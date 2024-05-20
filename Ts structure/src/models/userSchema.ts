import mongoose, { Schema, model } from 'mongoose';
import Joi from 'joi';
const userSchema = new Schema({
    username: {
        type: String,
        require: [true, 'userName is Require'],
        lowecase: true,
        unique:true,
        trim: true
    },
    email:{
        type:String,
        require:[true,'Email is Required'],
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        require: [true, 'Password is Required'],
        trim: true,
        minLength: 8
    },
    createdBy:{
        type:String,
        default:'Almas',
    },
    updatedBy:{
        type:String,
        default:'Almas'
    },
    createdAt:{
        type:Date,
        default :Date.now()
    },
    updatedAtAt:{
        type:Date,
        default :Date.now()
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('user',userSchema)

export const uservalidate = Joi.object({
    username : Joi.string().required().min(5),
    email:Joi.string().required().email(),
    password : Joi.string().required().min(8).max(16)
})

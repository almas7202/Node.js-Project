import Joi from "joi";
import mongoose, { Schema } from "mongoose";
const categorySchema = new Schema({
    categoryName:{
        type:String,
        require:[true,'category Name is Required'],
        unique:true,
        trim:true,
        lowercase:true
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
    }
})

export default mongoose.model('category',categorySchema)

export const categoryValidate = Joi.object({
    categoryName:Joi.string()
        .max(10)
        .required()
        .lowercase()
        .trim(),
    
})

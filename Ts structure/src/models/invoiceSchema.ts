import mongoose, { Schema } from "mongoose";
import productSchema from "./productSchema";
import Joi from "joi";
const invoiceSchema = new Schema({
    items:[{
        product_id:{
            type:Schema.Types.ObjectId,
            ref:'product',
            require:true
        },
        product_qty:{
            type:Number,
            require:true
        },
        unit_price:{
            type:Number,
            require:true
        },
        product_total:{
            type:Number,
            require:true
        }
    }],
    subTotal:{
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        default:0
    },
    gst:{
        type:Number,
        default:5
    },
    grandTotal:{
        type:Number,
        require:true
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

export default mongoose.model('invoice',invoiceSchema)

export const invoiceValidate = Joi.object({
  items: Joi.array().items(Joi.object({
    product_id : Joi.string().required(),
    product_name : Joi.string().required(),
    product_qty:Joi.number().required(),
    unit_price:Joi.number().required(),
    product_total:Joi.number().required()
  })).required(),

  subTotal : Joi.number().min(0).required(),
  discount : Joi.number().min(0).default(0),
  gst:Joi.number().required().default(5),
  grandTotal:Joi.number().min(0).required()
}).options({abortEarly:false,allowUnknown:true})


import mongoose, { Schema } from "mongoose";
import Joi, { string } from "joi";
// import categorySchema from "./categorySchema";

    const proudctSchema = new Schema({
        product_name:{
            type:String,
            require:[true,'product Name is Required'],
            lowercase:true,
            trim:true,
        },
        product_description:{
            type:String,
            require:[true,'product Description is required'],
            lowercase:true,
            trim:true,
            maxLength:250
        },
        product_images:{
            type:[String],
            require:[true,'product Image is Required']
            // require:[true,'product Image is Required']
        },
        product_price:{
            type:Number,
            require:[true,'Product Price is Requird']
        },
        product_qty:{
            type:Number,
            require:[true,'Product Qty is Required']
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:'category',
            require:[true,'Category Object id Is Required'],
            validate:{
                validator: async function (cat_id:any) : Promise<boolean> {
                    const category = await mongoose.models.category.findOne({_id:cat_id})
                    return !!category
                },
                message:'Category with this id does not exist'
            }
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
export default mongoose.model('product',proudctSchema)


export const productValidation = Joi.object({
    product_name:Joi.string().min(5).required(),
    product_description:Joi.string().min(5).required(),
    // product_images: Joi.string().required(),
    product_price:Joi.number().required(),
    product_qty:Joi.number().required(),
    category:Joi.string().required()
})

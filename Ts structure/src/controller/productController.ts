import productModel ,{productValidation} from '../models/productSchema'
import { Request,Response } from 'express'


export const createProduct = async(req:Request,res:Response) =>{
        console.log(req.files);
        console.log(req.body);
        
        const {error} = productValidation.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)
        if (!req.files) {
            return res.status(400).send("No file uploaded.");
        }
        const productImages = Array.isArray(req.files) ? req.files.map((file: Express.Multer.File) => file.path) : [];

        // const {product_name,product_description,product_price,product_qty,category} = req.body
        const product = await productModel.create({
            product_name:req.body.product_name,
            product_description:req.body.product_description,
            product_images:productImages,
            product_price:req.body.prodduct_images,
            product_qty:req.body.product_qty,
            category:req.body.category
        })
        if(product){
            res.send('Product Added Succesfully' + JSON.stringify(product))
        }else{
            res.status(400).send("Something Went Wrong")
        }

}

export const getProduct = async(req:Request,res:Response) =>{
    const getProducts = await productModel.find().populate({path:'category',select:'categoryName -_id'})
    // console.log(getProducts);
    if(getProducts){
        res.send(JSON.stringify(getProducts))
    }else{
        res.status(401).send('Data Not Found Try After some time')
    }
}


export const updateProduct = async(req:Request,res:Response) =>{
    const id = req.params.id
    console.log(id)
    const product = await productModel.updateOne({_id:id},{
        $set:{
            "product_name":req.body.product_name,
            "product_description":req.body.product_description,
            "prodduct_images":{
                "data":req.body.data,
                "contentType":req.body.contentType
            },
            "product_price":req.body.product_price,
            "product_qty":req.body.product_qty,
            "category":req.body.category
        }
    })
    console.log(product);
    if(product.acknowledged){
        return res.send(JSON.stringify(product) + 'Data Updated Succesfully')
    }else{
        res.status(404).send("Product Not Found")
    }

}
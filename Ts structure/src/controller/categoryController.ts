import categoryModel from "../models/categorySchema";
import { categoryValidate } from "../models/categorySchema";
import { Request,Response } from "express";

export const createCategory = async(req:Request,res:Response) =>{
    const {error} = categoryValidate.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const {categoryName} = req.body

    let category = await categoryModel.findOne({categoryName:req.body.categoryName})
    if(!category) {
        category = await categoryModel.create({
            categoryName
        })
        res.status(200).send(JSON.stringify(category))
    }
    else{
        res.status(403).send('Category Already Exist')
    }
}

export const getCategory = async(req:Request,res:Response) =>{
    const getAllCategorys = await categoryModel.find().select({categoryName:1})
    res.send(JSON.stringify(getAllCategorys))
}

export const updateCategory = async(req:Request,res:Response) =>{
    const id = req.params.id
    const category = await categoryModel.updateOne({_id:id},{
        $set:{
            "categoryName":req.body.categoryName
        }
    })
    console.log(category);
    
    if(!category){
        res.status(400).send('Not Found')
    }else{
        res.status(200).send('Update Succesfully')
    }
}
import invoiceModel from '../models/invoiceSchema'
import productModel from '../models/productSchema'
import { Request,Response } from 'express'


export const createInvoice = async(req:Request,res:Response) =>{
    let items :any = req.body.items
    let invalidItems = []
    let total =0

    for(const item of items){
        let product = await productModel.findById(item._id)
        if (!product) {
            invalidItems.push({product_id: item.product_id, message: "Product not found" });
            continue;
        }

        if(product.product_qty == undefined || product.product_qty < item.product_qty){
            invalidItems.push({product_id: item._id, message: "Insufficient Quantity" });
        } else {
            const updatedProduct1 = await productModel.updateOne(
                {_id: item._id},
                {$inc: {product_qty: -item.product_qty}},
                {new: true} // Set 'new' option to true to return the updated document
            );        
        }
        if(product.product_price == undefined){
            continue
        }
        item.unit_price = product.product_price
        const sub_total = item.product_qty * product.product_price
        total += sub_total
        item.product_total = sub_total

    }
    console.log(items);
    

    if (invalidItems.length > 0) {
        return res.status(400).json({ error: "Invalid items", invalidItems });
    }
    const subTotal = total;
    const discount = req.body.discount || 0;
    const gst = req.body.gst || 5;
    const grandTotal = subTotal - discount + (subTotal * gst / 100);

    // Create the invoice
    const invoiceData = {
        items: items,
        subTotal: subTotal,
        discount: discount,
        gst: gst,
        grandTotal: grandTotal,
    };

    try {
        const invoice = await invoiceModel.create(invoiceData);
        res.status(201).json(invoice);
    } catch (error:any) {
        res.status(500).json({ error: "Failed to create invoice", details: error.message });
    }
}
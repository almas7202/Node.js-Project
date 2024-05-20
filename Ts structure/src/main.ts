import express from 'express'
import userRoutes from '../src/routes/userRoutes'
import categoryRoutes from '../src/routes/categoryRoutes'
import productRoutes from '../src/routes/productRoutes'
import invoiceRoutes from '../src/routes/invoiceRoutes'
const app = express()
app.use(express.json())
app.use('/user',userRoutes)
app.use('/category',categoryRoutes)
app.use('/product',productRoutes)
app.use('/invoice',invoiceRoutes)
export default app
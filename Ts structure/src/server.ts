import 'dotenv/config'
import app from "./main";
import mongoose from 'mongoose';
const PORT = process.env.PORT 

mongoose.connect('mongodb://localhost:27017/projectdb')
    .then(()=> console.log('Succesfully connet with DB'))
    .catch((error) => console.log(error));

app.listen(PORT,()=>{
    console.log(`Application Running on ` + PORT);
})
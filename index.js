import express from'express'
import cors from 'cors'
import mongoose from 'mongoose'


const  app= express() 

// middleware
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//mongoDb Connection
const connectDb =async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected successfully!!!")
}
connectDb()

// Schema
const ProductSchema =new mongoose.Schema ({
    name:String,
    price:Number,
    image:String
})

//Model
const ProductModel=mongoose.model('product',ProductSchema)

//APIs
app.get('/',async(req, res)=>{
    res.send("this is working")
})
app.get('/products',async(req, res)=>{
    const products =await ProductModel.find()
    res.json(products)
})

//admin panel
app.post ('/products',async(req,res)=>{
    const product=new ProductModel(req.body)
    await product.save()
    res.json(product)
})

app.delete('/:id',async (req,res) =>{
const product =await ProductModel.findByIdAndDelete(req.params.id)
res.json(product)
    
})
app.listen (4000,()=> console.log("server running at http://localhost:4000"))

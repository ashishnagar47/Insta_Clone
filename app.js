const express=require('express')
const app=express()
const PORT=5000
const mongoose=require('mongoose')
const {MONGOURI}=require('./keys')

require('./models/user')
require('./models/posts')
app.use(express.json())
//app.use(express.urlencoded({extended:true}))
const Auth=require('./routes/auth')
const Post=require('./routes/posts')



app.use(Auth)
app.use(Post)
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log("Connected to mongoDB")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error in connection",err)
})


app.listen(PORT,()=>{
    console.log(`server has been started on http://localhost:${PORT}`)
})
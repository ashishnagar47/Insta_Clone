const express=require('express')
const app=express()
const PORT=process.env.PORT||5001
const mongoose=require('mongoose')
const {MONGOURI}=require('./config/keys')

require('./models/user')
require('./models/posts')
app.use(express.json())
const Auth=require('./routes/auth')
const Post=require('./routes/posts')
const User=require('./routes/user')



app.use(Auth)
app.use(Post)
app.use(User)
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

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log(`server has been started on http://localhost:${PORT}`)
})
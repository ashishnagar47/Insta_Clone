const express=require('express')
const route=express();
const mongoose=require('mongoose');
const User=mongoose.model('User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const reqLogin=require('../middlewares/reqLogin')

route.get('/',reqLogin,(req,res)=>{
    res.send("hello")
})


route.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!name || !email || !password){
        res.status(422).json({"error":"Please add all the fields"})
    }
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.json("User already exist with this email")
            }
            bcrypt.hash(password,12)
            .then(hashedPassword=>{
                const user=new User({
                    name,
                    email,
                    password:hashedPassword,
                    pic
                })
                user.save()
                .then((user)=>{
                    res.json({"message":"Saved Successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        })
        .catch(err=>{
            console.log(err)
        })

})

route.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.json({"error":"Please fill all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(!savedUser){
            res.json({"error":'invalid email or password'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.send('successfully signin')
                const token=jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email,followers,following,pic} =savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.json({"error":"invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports=route;
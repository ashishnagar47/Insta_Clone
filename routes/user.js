const express=require('express')
const route=express.Router();
const mongoose=require('mongoose');
const reqLogin=require('../middlewares/reqLogin');
const Post =mongoose.model("Post")
const User=mongoose.model("User")

route.get('/user/:id',reqLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.json({error:err})
            }
            res.json({user,posts})
        })
    })
    .catch(err=>{
        return res.json({error:err})
    }) 
})

module.exports=route
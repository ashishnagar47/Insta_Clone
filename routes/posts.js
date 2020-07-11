const express=require('express')
const route=express();
const mongoose=require('mongoose');
const reqLogin=require('../middlewares/reqLogin');
const Post =mongoose.model("Post")

route.post('/createPost',reqLogin,(req,res)=>{
    const {title,body}=req.body
    if(!title || !body){
        return res.send("Please add all the fields")
    }
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        postedBy:req.user
    })

    post.save()
    .then(result=>{
        res.send({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

})

route.get('/allPost',(req,res)=>{
    
    Post.find()
    .populate("postedBy","name")
    .then(posts=>{
        res.send({posts})
    })
    .catch((err)=>{
        console.log(err)
    })
})

route.get('/myPost',reqLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","name")
    .then(myPost=>{
        res.send({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=route;
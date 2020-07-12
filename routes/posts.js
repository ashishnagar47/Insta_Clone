const express=require('express')
const route=express();
const mongoose=require('mongoose');
const reqLogin=require('../middlewares/reqLogin');
const Post =mongoose.model("Post")

route.post('/createPost',reqLogin,(req,res)=>{
    const {title,body,pic}=req.body
    if(!title || !body || !pic){
        return res.json({error:"Please add all the fields"})
    }
    console.log(title,body,pic)
    req.user.password=undefined
    const post=new Post({
        title,
        body,
        picture:pic,
        postedBy:req.user
    })

    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

})

route.get('/allPost',reqLogin,(req,res)=>{
    
    Post.find()
    .populate("postedBy","name")
    .then(posts=>{
        res.json({posts})
    })
    .catch((err)=>{
        console.log(err)
    })
})

route.get('/myPost',reqLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","name")
    .then(myPost=>{
        res.json({myPost})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=route;
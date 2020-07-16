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

route.put('/follow',reqLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).select("-password")
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            return res.json({error:err})
        })
    })

})

route.put('/unfollow',reqLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password")
        .then(result=>{
            res.json(result)
        })
        .catch(err=>{
            return res.json({error:err})
        })
    })
    

})

module.exports=route
import React, { useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'
import  {useParams} from 'react-router-dom'


 const Profile=()=> {
        const [userProfile,setProfile]=useState(null)
        const {state,dispatch}=useContext(UserContext)
        const {userId} =useParams()
        const [showFollow,setShowFollow]=useState(state?!state.following.includes(userId):true)
        console.log(userId)
        useEffect(()=>{
            fetch(`/user/${userId}`,{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                setProfile(result)
                
            })
        },[])

        const followUser=()=>{
            fetch('/follow',{
                method:"put",
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify
                ({
                    followId:userId
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
                localStorage.setItem("user",JSON.stringify(data))
                setProfile((prevState)=>{
                    return{
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:[...prevState.user.followers,data._id]
                        }
                    }
                })
                setShowFollow(false)
            })
        }

        const unfollowUser=()=>{
            fetch('/unfollow',{
                method:"put",
                headers:{
                    'Content-Type':'application/json',
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify
                ({
                    unfollowId:userId
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
                localStorage.setItem("user",JSON.stringify(data))
                
                setProfile((prevState)=>{
                    const newFollower=prevState.user.followers.filter(item=>item!=data._id)
                    return{
                        ...prevState,
                        user:{
                            ...prevState.user,
                            followers:[newFollower]
                        }
                    }
                })
                setShowFollow(true)
            })
        }

        return (
            <>
            {userProfile?
            <div style={{maxWidth:"850px", margin:"0px auto"}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                }}>
                    <div>
                        <img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                        src={userProfile.user.pic}></img>
                    </div>
                    <div> 
                        <h4>{userProfile.user.name}</h4>
                        <h5>{userProfile.user.email}</h5>
                        <div style={{display:"flex", justifyContent:"space-around", width:"108%"} }>
                            <h6>{userProfile.posts.length} posts</h6>
                            <h6>{userProfile.user.followers.length} followers</h6>
                            <h6>{userProfile.user.following.length} following</h6>
                        </div>
                        {showFollow?
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>followUser()}>
                        follow
                        </button>
                        :
                        <button style={{margin:"10px"}} className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>unfollowUser()}>
                        unfollow
                        </button>}
                    </div>
                </div>
                <div className="gallery" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}} >
                    {
                        userProfile.posts.map(item=>{
                            return(
                                <img key={item._id} className="item" src={item.picture} alt={item.title} ></img>
                            )
                        })
                    }
                    
                    
                </div>
            </div>

            
            :<h2>loading ...</h2>}
            </>
        )
    }
    


export default Profile

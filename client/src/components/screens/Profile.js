import React, { useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'

 const Profile=()=> {
        const [myPics,setPics]=useState([])
        const {state,dispatch}=useContext(UserContext)
        useEffect(()=>{
            fetch('/myPost',{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            }).then(res=>res.json())
            .then(result=>{
                
                setPics(result.myPost)
            })
        },[])
        return (
            <div style={{maxWidth:"850px", margin:"0px auto"}}>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom:"1px solid grey"
                }}>
                    <div>
                        <img style={{width:"160px",height:"160px", borderRadius:"80px"}}
                        src={state?state.pic:"loading"}></img>
                    </div>
                    <div> 
                        <h4>{state?state.name:"loading"}</h4>
                        <h4>{state?state.email:"loading"}</h4>
                        <div style={{display:"flex", justifyContent:"space-around", width:"108%"} }>
                            <h6>{myPics.length} posts</h6>
                            <h6>{state?state.followers.length:0} followers</h6>
                            <h6>{state?state.following.length:0} following</h6>
                        </div>
                    </div>
                </div>
                <div className="gallery" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}} >
                    {
                        myPics.map(item=>{
                            return(
                                <img key={item._id} className="item" src={item.picture} alt={item.title} ></img>
                            )
                        })
                    }
                    
                    
                </div>
            </div>
        )
    }


export default Profile

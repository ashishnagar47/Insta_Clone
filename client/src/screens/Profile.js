import React, { useEffect,useState,useContext } from 'react'
import {UserContext} from '../App'

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
        })
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
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"></img>
                    </div>
                    <div> 
                        <h4>{state?state.name:"loading"}</h4>
                        <div style={{display:"flex", justifyContent:"space-around", width:"108%"} }>
                            <h6>40 posts</h6>
                            <h6>40 followers</h6>
                            <h6>40 following</h6>
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

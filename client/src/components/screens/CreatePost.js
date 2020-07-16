import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost=()=> {
    const history=useHistory()
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const [image,setImage]=useState("")
    const [url,setUrl]=useState("")

    useEffect(()=>{
        if(url){
            fetch("/createPost",{
                method:"post",
                headers:{"Content-Type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("jwt")},
                body:JSON.stringify({
                    title,
                    body,
                    pic:url,

                })
            }).then(res=>res.json())
            .then(data=>{
                
                if(data.error){
                    M.toast({html:data.error,classes:"#d32f2f red darken-2"})
                }
                else{
                    console.log("123")
                    M.toast({html:"Post Created Successfully",classes:"#4caf50 green"})
                    history.push('/')
                }
            })
            .catch(err=>console.log(err))
    }
    },[url])

    const postDetails=()=>{
        const data=new FormData()
        data.append("file",image)
        data.append("upload_preset","insta_clone")
        data.append("cloud_name","ashishnagar47")

        fetch("https://api.cloudinary.com/v1_1/ashishnagar47/image/upload",
        {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>console.log(err))
    
        
    }

    return (
        <div className="card input-field" 
            style={{
                margin:"30px auto",
                maxWidth:"550px",
                padding:"20px",
                textAlign:"center"
            }}
        >
            <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <input type="text" placeholder="body" value={body} onChange={(e)=>setBody(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn #42a5f5 blue darken">
                    <span>Upload Image</span>
                    <input type="file"  onChange={(e)=>setImage(e.target.files[0])}></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                </div>
            </div>
                <button className="btn waves-effect waves-light #42a5f5 blue darken" onClick={()=>postDetails()}>
                        Submit Post
                </button>
        </div>

    )
}

export default CreatePost

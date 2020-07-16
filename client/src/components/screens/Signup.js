import React, { useState, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css"

 const Signup = ()=> {
        const history=useHistory();
        const [name,setName]=useState("")
        const [password,setPassword]=useState("")
        const [email,setEmail]=useState("")
        const [image,setImage]=useState("")
        const [url,setUrl]=useState(undefined)

        useEffect(()=>{
            if(url){
                uploadFields()
            }
        },[url])
        const uploadPic=()=>{
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

        const uploadFields=()=>{
            if(!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email)){
                M.toast({html:"invalid email address",classes:"#d32f2f red darken-2"})
                return
            }
            fetch("/signup",{
                method:"post",
                headers:{"Content-Type":"application/json",'Accept': 'application/json'},
                body:JSON.stringify({
                    name,
                    email,
                    password,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                //console.log(data)
                if(data.error){
                    M.toast({html:data.error,classes:"#d32f2f red darken-2"})
                }
                else{
                    M.toast({html:data.message,classes:"#4caf50 green"})
                    history.push('/login')
                }
            })
            .catch(err=>console.log(err))
        }

        const PostData =()=>{
            if(image){
                uploadPic()
            }
            else{
                uploadFields()
            }
        }

        return (
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="name" value={name} onChange={e=>setName(e.target.value)}></input>
                    <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
                    <div className="file-field input-field">
                        <div className="btn #42a5f5 blue darken">
                            <span>Upload Pic</span>
                            <input type="file"  onChange={(e)=>setImage(e.target.files[0])}></input>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={()=>PostData()}>
                        Login
                    </button>
                    <h6>
                         <Link to="/login">Already have an account ?</Link>
                    </h6>
                </div>

            </div>
        )
    }


export default Signup

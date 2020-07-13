import React, { useState, useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

 const Login =()=> {
     const {state,dispatch}=useContext(UserContext)
    const history=useHistory();
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const PostData =()=>{
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            M.toast({html:"invalid email address",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("/login",{
            method:"post",
            headers:{"Content-Type":"application/json",'Accept': 'application/json'},
            body:JSON.stringify({
                email,
                password,
            })
        }).then(res=>res.json())
        .then(data=>{
            //console.log(data)
            if(data.error){
                
                M.toast({html:data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signedin successfully ",classes:"#4caf50 green"})
                history.push('/')
            }
        })
        .catch(err=>console.log(err))
    }


        return (
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1" onClick={PostData}>
                        Login
                    </button>
                    <h6>
                        <Link to="/signup">Create account</Link>
                    </h6>
                </div>
            </div>
        )
    }


export default Login

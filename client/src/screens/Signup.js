import React, { useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from "materialize-css"

 const Signup = ()=> {
        const history=useHistory();
        const [name,setName]=useState("")
        const [password,setPassword]=useState("")
        const [email,setEmail]=useState("")
        const PostData =()=>{
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

        return (
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="name" value={name} onChange={e=>setName(e.target.value)}></input>
                    <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}></input>
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

import React, { useState} from 'react'
import {Link} from 'react-router-dom'

 const Signup = ()=> {
        const [name,setName]=useState("")
        const [password,setPassword]=useState("")
        const [email,setEmail]=useState("")

        return (
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="name"></input>
                    <input type="text" placeholder="email"></input>
                    <input type="text" placeholder="password"></input>
                    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1">Login</button>
                    <h6>
                         <Link to="/login">Already have an account ?</Link>
                    </h6>
                </div>

            </div>
        )
    }


export default Signup

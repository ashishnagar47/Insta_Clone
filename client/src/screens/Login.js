import React, { Component } from 'react'
import {Link} from 'react-router-dom'

 class Login extends Component {
    render() {
        return (
            <div className="myCard">
                <div className="card auth-card input-field">
                    <h2>Instagram</h2>
                    <input type="text" placeholder="email"></input>
                    <input type="text" placeholder="password"></input>
                    <button className="btn waves-effect waves-light #42a5f5 blue lighten-1">
                        Login
                    </button>
                    <h6>
                        <Link to="/signup">Create account</Link>
                    </h6>
                </div>
            </div>
        )
    }
}

export default Login

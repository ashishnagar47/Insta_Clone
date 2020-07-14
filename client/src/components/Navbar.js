import React, { useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const  Navbar=()=> {
        const history=useHistory()
        const {state,dispatch}=useContext(UserContext)
        const renderList=()=>{
            console.log(state)
            if(state){
                
                return[
                    <li><Link to="/profile">Profile</Link></li>,
                    <li><Link to="/create">Create Post </Link></li>,
                    <li>
                    <button className="btn waves-effect waves-light #b71c1c red darken-4" onClick={()=>{
                        localStorage.clear()
                         dispatch({type:"CLEAR"})
                         history.push('/login')
                     } }>
                        Logout
                    </button>
                    </li>
                ]
            }
            if(!state){
                console.log("ashish")
                return[
                <li><Link to="/login">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
                
            ]
            }
        }

        return (
            <div>
                <nav>
                    <div className="nav-wrapper white" >
                    <Link to={state?"/":"/login"} className="brand-logo left">Instagram</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {renderList()}
                    </ul>
                    </div>
                </nav>
        
            </div>
        )
    }


export default Navbar

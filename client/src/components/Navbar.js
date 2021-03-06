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
                    <li><Link to="/profile"><i class="material-icons">account_circle</i></Link></li>,
                    <li><Link to="/create"><i class="material-icons">add_a_photo</i></Link></li>,
                    <li><Link to="/myfollowingPost"> <i class="material-icons">explore</i></Link></li>,
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
                    <ul id="nav-mobile" className="right">
                            {renderList()}
                    </ul>
                    </div>
                </nav>
        
            </div>
        )
    }


export default Navbar

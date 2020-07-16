import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Explore from './components/screens/Explore'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import Home from './components/screens/Home'
import {reducer,initialState} from './reducer/UserReducer'

export const UserContext= createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse( localStorage.getItem("user"))
    
    if(user){
      dispatch({type:"USER",payload:user})
      
    }
    else{
      history.push('/login')
    }
    console.log(user)
  },[])
  return(
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/profile/:userId">
        <UserProfile />
      </Route>

      <Route path="/myfollowingPost">
        <Explore />
      </Route>
  
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing></Routing>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

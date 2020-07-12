import React,{useEffect,createContext,useReducer,useContext} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import CreatePost from './screens/CreatePost'
import {reducer,initialState} from './reducer/UserReducer'

export const UserContext= createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse( localStorage.getItem("user"))
    if(user){
      dispatch({type:"User",payload:user})
      history.push('/')
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

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/signup">
        <Signup />
      </Route>

      <Route path="/profile">
        <Profile />
      </Route>

      <Route path="/create">
        <CreatePost />
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

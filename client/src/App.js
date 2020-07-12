import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter,Route} from 'react-router-dom'
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile'
import CreatePost from './screens/CreatePost'


function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Route exact path='/'>
          <Home></Home>
      </Route>
      <Route path="/login">
        <Login></Login>
      </Route>
      <Route path="/signup">
        <Signup></Signup>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
      <Route path="/create">
        <CreatePost></CreatePost>
      </Route>
    </BrowserRouter>
  );
}

export default App;

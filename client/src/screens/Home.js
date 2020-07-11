import React, { Component } from 'react'

 class Home extends Component {
    render() {
        return (
            <div className="home">
               <div className="card home-card">
                   <h5>Nolan</h5>
                   <div className="card-image">
                       <img src="https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                   </div>
                   <div className="card-content">
                   <i className="material-icons" style={{color:"red"}}>favorite</i>
                       <h6>Title</h6>
                       <p>This is amazing post</p>
                       <input type="text" placeholder="add a comment"></input>
                   </div>
               </div>

               <div className="card home-card">
                   <h5>Nolan</h5>
                   <div className="card-image">
                       <img src="https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                   </div>
                   <div className="card-content">
                   <i className="material-icons" style={{color:"red"}}>favorite</i>
                       <h6>Title</h6>

                       <p>This is amazing post</p>
                       <input type="text" placeholder="add a comment"></input>
                   </div>
               </div>

               <div className="card home-card">
                   <h5>Nolan</h5>
                   <div className="card-image">
                       <img src="https://images.unsplash.com/photo-1480497490787-505ec076689f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"></img>
                   </div>
                   <div className="card-content">
                   <i className="material-icons" style={{color:"red"}}>favorite</i>
                       <h6>Title</h6>
                       <p>This is amazing post</p>
                       <input type="text" placeholder="add a comment"></input>
                   </div>
               </div>
            </div>
        )
    }
}

export default Home

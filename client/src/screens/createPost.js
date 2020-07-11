import React from 'react'

function createPost() {
    return (
        <div className="card input-field" 
            style={{
                margin:"30px auto",
                maxWidth:"550px",
                padding:"20px",
                textAlign:"center"
            }}
        >
            <input type="text" placeholder="title"></input>
            <input type="text" placeholder="body"></input>
            <div className="file-field input-field">
                <div className="btn #42a5f5 blue darken">
                    <span>Upload Image</span>
                    <input type="file"></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                </div>
                </div>
                <button className="btn waves-effect waves-light #42a5f5 blue darken">
                        Submit Post
                </button>
        </div>
    )
}

export default createPost

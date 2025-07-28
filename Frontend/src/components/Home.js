import React, { useEffect } from 'react'
// import "./home.css"
export default function Home(props) {
  return (
      <div className="d-flex justify-content-center align-items-center vh-100 w-100" style={{backgroundColor:`${props.mode==="dark"?"#524747ff":"#f0f0f0ff"}`,transition: "background-color 0.3s ease"}}>
  <div className="text" style={{color:`${props.mode==="dark"?"white":"black"}`}}>
    <h1 style={{fontSize:"50px"}}>Organize your <br></br>work and life ,Finally.</h1>
    <p style={{fontSize:"25px"}}>Stay organized and get things done — one task at a time.</p>
  </div>
</div>

  )
}

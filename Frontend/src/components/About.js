import React from 'react'

export default function About(props) {
  return (
    <div>
      <div className="d-flex align-items-center vh-100" style={{backgroundColor:`${props.mode==="dark"?"#4b4444":"#f0f0f0ff"}`}}>
  <div className="text mx-8" style={{color:`${props.mode==="dark"?"white":"black"}`, marginLeft: "227px"}}>
    <div className='d-flex'>
        <h1 style={{fontSize:"50px"}}>About Us<hr></hr></h1>
    </div>
    <p style={{fontSize:"15px"}}>The ToDo List app is a simple, efficient tool designed to help users organize their daily activities and manage 
        their time effectively. Whether you're tracking personal goals, managing work assignments, or keeping up with everyday tasks, this app provides a clean and intuitive interface
         to stay on top of it all. Users can easily create, edit, and delete tasks, mark items as complete, and stay focused through a clutter-free experience. With a responsive design 
         and smooth interactions, the app ensures accessibility across all devices. It also supports light and dark themes for a personalized look. Whether you're a student, professional
         , or just someone trying to stay organized, 
        the ToDo List app helps turn chaotic to-do piles into clear, manageable plans. No sign-up required — just open the app and start organizing. Simplicity and productivity, combined
         into one lightweight task manager built for real-world use.</p>
  </div>
</div>
    </div>
  )
}

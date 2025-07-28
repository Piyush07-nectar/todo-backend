import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function Signup(props) {
  const navigate = useNavigate();
  const [input,setInput]=useState({
    email:"",
    name:"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setInput({...input,[name]:value})
  }
  const submit=async(e)=>{
     e.preventDefault()
     try{
   const res= await axios.post(`${window.location.origin}/api/register`,input)
      toast.success("User is Sign up")
      navigate("/signin")
      setInput({
     email:"",
    name:"",
    password:""
    })
   }
   catch(err){
     toast.error("Something went wrong");
   }
  }
  return (
    <div
  className="vh-100 vw-100 d-flex justify-content-center align-items-center"
  style={{
    backgroundColor: props.mode === "dark" ? "#524747ff" : "#f0f0f0",
    transition: "background-color 0.3s ease"
  }}
>
     <ToastContainer />
    <div className='container d-flex justify-content-center align-items-center vh-100 w-50'>
        <div className="container"><h4  style={{color:`${props.mode==="dark"?"white":"black"}`}}>Sign Up</h4>
        <div className="container"  style={{border:"1px solid black",backgroundColor:"lightgrey"}}>
             <form>
    <div className="mb-3">
    <label for="exampleInputName1" className="form-label">Name</label>
    <input className="form-control" name="name"id="exampleInputName1" aria-describedby="emailHelp" onChange={handleChange} value={input.name}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}   value={input.email}/>
</div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name="password"className="form-control" id="exampleInputPassword1"onChange={handleChange} value={input.password}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
</form>
        </div>
  </div>
    </div>
    </div>
  )
}

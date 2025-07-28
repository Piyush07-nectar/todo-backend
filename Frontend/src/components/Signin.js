import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';
export default function Signin(props) {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [input,setInput]=useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setInput({...input,[name]:value})
  }
  const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${window.location.origin}/api/login`, input);
    toast.success("User logged in successfully");
    setInput({
      email: "",
      password: ""
    });
    dispatch(authAction.login())
    sessionStorage.setItem("id",res.data.other._id)
    navigate("/todo")
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      toast.error(err.response.data.message); // Shows backend message
    } else {
      toast.error("Something went wrong");
    }
    console.error(err); // helpful for debugging
  }
};

  return (
    <div
  className="vh-100 vw-100 d-flex justify-content-center align-items-center"
  style={{
    backgroundColor: props.mode === "dark" ? "#524747ff" : "#f0f0f0",
    transition: "background-color 0.3s ease"
  }}
>
      <ToastContainer />
    <div className='container d-flex justify-content-center align-items-center vh-100 w-50' >
        <div className="container"><h4  style={{color:`${props.mode==="dark"?"white":"black"}`}}>Sign In</h4>
        <div className="container"  style={{border:"1px solid black",backgroundColor:"lightgrey"}}>
             <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"name='email'  onChange={handleChange}   value={input.email}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label"  >Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} name='password' value={input.password}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={submit}>Submit</button>
</form>
        </div>
  </div>
    </div>
   </div>
  )
}

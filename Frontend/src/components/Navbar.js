import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from 'react-router-dom';
export default function Navbar(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
   const dispatch=useDispatch()
   const navigate = useNavigate();
   const logout=()=>{
    dispatch(authAction.logout())
    sessionStorage.clear("id")
     navigate("/")
   }
    console.log(isLoggedIn)
  return (
    <div>
      <nav className={`navbar navbar-expand-lg fixed-top navbar-${props.mode==='dark'?'dark':'light'}` } style={{backgroundColor:`${props.mode==='dark'?'#333333':'lightgrey'}`}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><b>ToDo</b></Link >
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link >
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/about">About Us</Link >
        </li>
         {isLoggedIn&&<>
         <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/todo">ToDo</Link >
        </li>
         </>}
        {!isLoggedIn&&<>
        <li className="nav-item">
          <Link className="nav-link active btn mx-3 " aria-current="page"  style={{backgroundColor:`${props.mode==="dark"?"#545e44ff":"#d7ebb4ff"}`}} to="/signin">Sign In</Link >
        </li>
        <li className="nav-item">
          <Link className="nav-link active btn mx-3" aria-current="page"style={{backgroundColor:`${props.mode==="dark"?"#545e44ff":"#d7ebb4ff"}`}} to="/signup" >Sign Up</Link >
        </li>
        </>}
        {isLoggedIn&&<>
         <li className="nav-item" onClick={logout} >
          <Link className="nav-link active btn "aria-current="page"style={{backgroundColor:`${props.mode==="dark"?"#545e44ff":"#d7ebb4ff"}`}} to="/signout" >Sign Out</Link >
        </li>
        </>}
        <div className="form-check form-switch mx-3 ms-auto" style={{marginTop: "8px",marginLeft: "-26px"}}>
  <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="switchCheckDefault" style={{marginLeft: "-26px"}}/>
  <label className="form-check-label" style={{color:`${props.mode==="dark"?"white":"black"}`}} htmlFor="switchCheckDefault">Enable {props.mode==="dark"?"Light":"Dark"} mode</label>
</div>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

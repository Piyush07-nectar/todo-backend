import React from 'react'

export default function Footer(props) {
  return (
    <div className="container-fluid p-3 d-flex justify-content-center align-items-center fixed-bottom" style={{backgroundColor:`${props.mode==='dark'?'#333333':'lightgrey'}`}}>
       <h4 style={{color:`${props.mode==="dark"?"white":"black"}`}}>ToDo</h4> &nbsp;<p style={{color:`${props.mode==="dark"?"white":"black"}`}}>&copy;NectarBarahseni</p>

      
    </div>
  )
}

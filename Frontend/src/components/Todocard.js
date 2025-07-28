import React from 'react'

export default function Todocard(props) {
  return (
    <div>
      <div className="card mx-3" style={{width:"250px" ,overflow: "auto"}}>
  <div className="card-header">
    Todo 
  </div>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text" >{props.body}</p>
  </div>
  <div className='d-flex justify-content-around'> <div><button className='btn  btn-primary' onClick={()=>props.update(props.updateId)}>Update</button></div>
   <div><button className='btn  btn-danger' onClick={()=>props.del(props.index)}>Delete</button></div>
   </div>
</div>
    </div>
  )
}

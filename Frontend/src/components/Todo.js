import { width } from '@fortawesome/free-brands-svg-icons/fa11ty'
import React, { useEffect, useState } from 'react'
import Todocard from './Todocard'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import './todo.css';
import axios from 'axios'
const item=[]
export default function Todo(props) {
    let id=sessionStorage.getItem("id")
    const show=()=>{
        document.getElementById("body").style.display="Block"
    }
   const [title,setTitle]=useState("")
   const [body,setBody]=useState("")
   const [arr,setArr]=useState([])
    const handleChangeTitle=(e)=>{
        console.log(e.target.value)
       setTitle(e.target.value)
        setUpdateTitle(e.target.value)
    }
     const handleChangeBody=(e)=>{
        console.log(e.target.value)
       setBody(e.target.value)
        setUpdateBody(e.target.value)
    }
    const showData=async()=>{
        await axios.post(`${window.location.origin}/api/addList`,{title:title,body:body,id:id})
        .then((Response)=>{
            console.log(Response)
        })
        setArr([...arr,{title,body}])
        console.log(arr)
        setTitle("")
        setBody("")
        toast.success("Task is Added")
    }
    useEffect(()=>{
        const fetch=async()=>{
         await axios.get(`${window.location.origin}/api/getTask/${id}`)
        .then((Response)=>{
            setArr(Response.data.list)
        })
        }
        fetch();
    },[showData])
    const del=async(index)=>{
        await axios.delete(`${window.location.origin}/api/deleteTask/${index}`, {
      data: { id: id }}  )
        .then((Response)=>{
          console.log(Response.data)
        })

        toast.success("Task is Deleted")
    }
    const [showPage,setShowPage]=useState(false)
    const [updateTitle,setUpdateTitle]=useState("")
   const [updateBody,setUpdateBody]=useState("")
   const [x,setX]=useState()
    const update=(index)=>{
        setTimeout(()=>{
            document.getElementById("update-page").style.opacity="1"
        document.getElementById("update-page").style.transform="translateY(0)"
        },50)
        setShowPage(true)
        const item=arr[index]
        setUpdateTitle(item.title)
        setUpdateBody(item.body)
        console.log(item)
        setX(index)
    }
    const updateData=async(x)=>{
        const item=arr[x]
        let itemId=item._id
    await axios.put(`${window.location.origin}/api/update/${itemId}`,{title:updateTitle,body:updateBody,id:id})
    .then((Response)=>{
        console.log(Response)
    })
    setShowPage(false)
    setTitle("")
    setBody("")
     toast.success("Task is Updated")
    }
  return (
   <div
  className="vh-100 vw-100 d-flex flex-column align-items-center"
  style={{
    backgroundColor: props.mode === "dark" ? "#524747ff" : "#f0f0f0",
    transition: "background-color 0.3s ease",
    paddingTop: "75px",
  }}
>
  <ToastContainer />
  <div className="container d-flex flex-column align-items-center w-50 p-3" style={{ backgroundColor: props.mode === "dark" ? "#3c2f2fff" : "#fff", borderRadius: "8px" }}>
    <h3 style={{ color: props.mode === "dark" ? "white" : "black" }}>ToDo</h3>
    <input
      type="text"
      placeholder="Title"
      value={title}
      className="my-2 p-2 w-100"
      id="title"
      onChange={handleChangeTitle}
      name="title"
      onClick={() => {
        const bodyInput = document.getElementById('body');
        if (bodyInput) bodyInput.style.display = 'block';
      }}
      style={{ borderRadius: "4px", border: "1px solid #ccc" }}
    />
    <input
      type="text"
      placeholder="Body"
      value={body}
      className="my-2 p-2 w-100"
      id="body"
      onChange={handleChangeBody}
      name="body"
      style={{ display: "none", borderRadius: "4px", border: "1px solid #ccc" }}
    />
    <button
      disabled={title === "" || body === ""}
      className="btn btn-secondary mt-2"
      style={{ width: "100px", alignSelf: "flex-end" }}
      onClick={showData}
    >
      Add
    </button>
  </div>

  <div
    className="container d-flex flex-wrap justify-content-center mt-4"
    style={{ gap: "15px", maxWidth: "80vw" }}
  >
    {arr &&
      arr.map((element, index) => {
        return (
          <div key={element._id || index}>
            <Todocard
              title={element.title}
              body={element.body}
              index={element._id}
              del={del}
              update={update}
              updateId={index}
            />
          </div>
        );
      })}
  </div>

  {showPage && (
   <div
  id="update-page"
  style={{
    position: "fixed",
        top: "30%",
    left: "25%",
    transform: "translate(-50%, -50%)",
    backgroundColor: props.mode === "dark" ? "#3c2f2fff" : "lightgrey",
    border: "1px solid #ccc",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
    padding: "20px",
    zIndex: 1000,
    borderRadius: "8px",
    width: "50%",
    transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
    opacity: showPage ? 1 : 0,
  }}
>
      <h2 style={{ color: props.mode === "dark" ? "white" : "black" }}>Update Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={updateTitle}
        className="my-2 p-2 w-100"
        id="title"
        onChange={handleChangeTitle}
        name="title"
        style={{ borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Body"
        value={updateBody}
        className="my-2 p-2 w-100"
        id="body"
        onChange={handleChangeBody}
        name="body"
        style={{ borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button onClick={() => updateData(x)} className="btn btn-primary">
          Update
        </button>
        <button onClick={() => setShowPage(false)} className="btn btn-danger">
          Close
        </button>
      </div>
    </div>
  )}
</div>
  )
}

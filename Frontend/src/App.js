import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { useState,useEffect } from 'react';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';
import { useDispatch } from 'react-redux';
import { authAction } from './store';
function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    const id=sessionStorage.getItem("id")
    if(id){
      dispatch(authAction.login())
    }
  })
  const [mode,setMode]=useState('lightgrey')
  const toggleMode=()=>{
    if(mode==='lightgrey'){
      setMode('dark')
    }
    else{
      setMode('lightgrey')
    }
  }
  const [login, setLogin]=useState(false)
  const auth=()=>{
    if(login==='login'){
      setLogin(false)
    }
    else{
      setLogin(true)
    }
  }
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(30); // Start
    setTimeout(() => {
      setProgress(100); // Complete after 1s
    }, 1000);
  }, []);
  return (
<>
<BrowserRouter>
<Navbar mode={mode} toggleMode={toggleMode}/>
 <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
          <Route path="/" element={<Home mode={mode} />  } />
          <Route path="/about" element={<About  mode={mode}/>} />
          <Route path="/todo" element={<Todo  mode={mode}/>} />
          <Route path="/signin" element={<Signin mode={mode} login={login}/>  } />
          <Route path="/signup" element={<Signup  mode={mode}/>} />
      </Routes>
      <Footer mode={mode} />
    </BrowserRouter>
</>
  );
}

export default App;

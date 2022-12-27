import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home'
import About from './component/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message : message,
      type : type
    })

    setTimeout(()=>{
      setAlert(null);
    }, 2000)
  }

  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/> 
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
      <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
      <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

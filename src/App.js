import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home'
import About from './component/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="Awsome"/>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
      <Route exact path="/login" element={<Login/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

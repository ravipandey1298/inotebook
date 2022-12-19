import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home'
import About from './component/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'

function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home/>}></Route>
      <Route exact path="/about" element={<About/>}></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

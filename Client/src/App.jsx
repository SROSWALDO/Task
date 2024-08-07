import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import TaskList from './Components/TaskList';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Create from './Components/Create';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />

        
      </Routes>
    </>
  )
}

export default App

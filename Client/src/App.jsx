import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Create from './Components/Create';
import AboutMe from './Components/AboutMe';



function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/about' element={<AboutMe />} />
      </Routes>
    </>
  )
}

export default App;

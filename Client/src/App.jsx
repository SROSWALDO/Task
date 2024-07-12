import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import TaskList from './Components/TaskList';

function App() {

  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/task');
      const { data } = response;
      setTasks(data);
      console.log(data);
    } catch (error) {
      console.log("Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <div>
        <TaskList tasks={tasks} />
        
      </div>
    </>
  )
}

export default App

import { useEffect, useState } from 'react'
import axios from 'axios';
import TaskList from './TaskList';
import Navbar from './Navbar';

function Home() {

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

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/task');
      const { data } = response;
      setTasks(data)
    } catch (error) {
      console.log("Cant create task");
    }
  }

  const deleteTask = async (id) => {
    try {
      const deleted = await axios.delete(`http://localhost:3001/task/${id}`);
      setTasks(tasks => tasks.filter(task => task.id !== id )); // si el id de la tarea no es igual al id de la tarea que queremos eliminar,entonces esa tarea se incluirá en el nuevo array
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <div className='bg-carbon w-full h-[100vh] text-white ' >
        <Navbar />
        <div className="container w-[1200px] m-auto mt-14 ">
        
        <TaskList deleteTask={deleteTask} tasks={tasks} />
        </div>
        
      </div>
    </>
  )
}

export default Home;

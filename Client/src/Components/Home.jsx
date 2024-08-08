import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import Navbar from "./Navbar";
import Create from "./Create";
import useStore from "./Store";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const { tasks, setTasks, editingTask, setEditingTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [theme, setTheme] = useState("light")

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'; // Por defecto es 'light'
    setTheme(savedTheme);
  }, []);
  

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      console.log('Added dark class to html');
    } else {
      htmlElement.classList.remove('dark');
      console.log('Removed dark class from html');
    }
  }, [theme]);

  const URL = "http://localhost:3001/task";

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data;
      setTasks(data); // Asegúrate de que `setTasks` actualiza correctamente el estado
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const showDeleteToast = (taskid) => {
    toast.info(`Task ${taskid} delete successfully `)

  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id)); // Filtra la tarea eliminada
      showDeleteToast(id)
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccessToast = (task) => {
    console.log('showSuccessToast called');
    toast.success(`Task ${task} created successfully`);
  };

  const handleSave = async (taskData, taskId) => {
    try {
      let response;
      if (taskId) {
        response = await axios.put(`${URL}/${taskId}`, taskData);
        console.log('Edited Task Response:', response.data);
        setTasks(tasks.map(task => (task.id === taskId ? response.data : task))); // Actualiza la tarea editada
        window.location.reload()
      } else {
        response = await axios.post(URL, taskData);
        console.log('Created Task Response:', response.data);
        setTasks([...tasks, response.data]); // Agrega la nueva tarea
        showSuccessToast(response.data.description)
      }
      console.log('Updated Tasks:', tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCompleted = async (id) => {
    try {
      // Encuentra la tarea que se está marcando
      const taskToUpdate = tasks.find(task => task.id === id);  //Utiliza el método find para buscar la tarea en el array de tasks que coincide con el id proporcionado. Esto devuelve el objeto de la tarea que se va a actualizar.
      if (taskToUpdate) { //si existe
        // Alterna el estado `completed`
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
        await axios.put(`${URL}/${id}`, updatedTask); // Actualiza la tarea en el backend
        setTasks(tasks.map(task => (task.id === id ? updatedTask : task))); //recorre cada tarea y reemplaza la tarea con el id coincidente por updatedTask. Así, la tarea en el estado local refleja el nuevo estado completed.
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editingTask) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [editingTask]);

  return (
    <div className="w-full h-[100vh] bg-gray-100 text-gray-900 font-sans dark:bg-[#242424] ">
      <Navbar handleCreate={handleCreate} handleChangeTheme={handleChangeTheme} />
      <div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2 flex justify-center m-auto mt-2 " onClick={handleCreate} >Create Task!</button>
      </div>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
        handleCreate={handleCreate}
        handleCompleted={handleCompleted}
      />
      <Create
        isModalOpen={isModalOpen}
        handleCancel={() => {
          setEditingTask(null);
          setIsModalOpen(false);
        }}
        handleSave={handleSave}
      />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
    
  );
  
}

export default Home;

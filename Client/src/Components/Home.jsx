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

  // const [theme, setTheme] = useState("light")

  // const handleChangeTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   localStorage.setItem('theme', newTheme);
  // }
  
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme') || 'light'; // Por defecto es 'light'
  //   setTheme(savedTheme);
  // }, []);
  

  // useEffect(() => {
  //   const htmlElement = document.querySelector('html');
  //   if (theme === 'dark') {
  //     htmlElement.classList.add('dark');
  //     console.log('Added dark class to html');
  //   } else {
  //     htmlElement.classList.remove('dark');
  //     console.log('Removed dark class from html');
  //   }
  // }, [theme]);

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
    <div className="w-full h-[100vh] bg-gray-100 text-gray-900 font-sans dark:bg-[#000000] ">
      <Navbar handleCreate={handleCreate}  />
      <div>
      <button class="relative flex justify-center m-auto mt-4 h-12 dark:active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none" onClick={handleCreate} >
      <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
      <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 dark:bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
      Create Task!
      </span>
        
        </button>
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

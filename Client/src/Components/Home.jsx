import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import Navbar from "./Navbar";
import Create from "./Create";
import useStore from "./Store";

function Home() {
  const { tasks, setTasks, editingTask, setEditingTask } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const URL = "http://localhost:3001/task";

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data;
      setTasks(data); // Asegúrate de que `setTasks` actualiza correctamente el estado
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      setTasks(tasks.filter(task => task.id !== id)); // Filtra la tarea eliminada
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async (taskData, taskId) => {
    try {
      let response;
      if (taskId) {
        response = await axios.put(`${URL}/${taskId}`, taskData);
        console.log('Edited Task Response:', response.data);
        setTasks(tasks.map(task => (task.id === taskId ? response.data : task))); // Actualiza la tarea editada
      } else {
        response = await axios.post(URL, taskData);
        console.log('Created Task Response:', response.data);
        setTasks([...tasks, response.data]); // Agrega la nueva tarea
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
    <div className="w-full h-[100vh]">
      <Navbar handleCreate={handleCreate} />
      <div className="m-auto text-center p-5">
        <h1 className="text-xl">App Todo</h1>
      </div>
      <TaskList
        tasks={tasks} // Pasa el estado actualizado de tasks a TaskList
        deleteTask={deleteTask}
        setEditingTask={setEditingTask}
        handleCreate={handleCreate}
        handleCompleted={handleCompleted} // Pasa la función handleCompleted a TaskList
      />
      <Create
        isModalOpen={isModalOpen}
        handleCancel={() => {
          setEditingTask(null);
          setIsModalOpen(false);
        }}
        handleSave={handleSave}
      />
    </div>
  );
}

export default Home;

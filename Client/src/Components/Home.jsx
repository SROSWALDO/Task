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
      const { data } = response;
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
    <div className="w-full h-[100vh] ">
      <Navbar handleCreate={handleCreate} />
      <div className="m-auto text-center p-5">
        <h1 className="text-xl">App Todo</h1>
      </div>
      <TaskList
        tasks={tasks} // Pasa el estado actualizado de tasks a TaskList
        deleteTask={deleteTask}
        setEditingTask={(task) => {
          setEditingTask(task);
        }}
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

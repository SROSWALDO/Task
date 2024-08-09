import React, { useEffect } from "react";
import { Pagination } from "antd";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import "./TaskList.css";
import { ToastContainer, toast } from "react-toastify";

export default function TaskList({
  tasks,
  deleteTask,
  setEditingTask,
  handleCreate,
  handleCompleted, // Asegúrate de recibir handleCompleted como prop
}) {
  // Asegúrate de que tasks es un array
  if (!Array.isArray(tasks)) {
    console.log("Invalid tasks array:", tasks); // Verifica si tasks no es un array
    return null;
  }

  // Estado para la paginación
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 7;

  // Calcular las tareas para la página actual
  const startIndex = (currentPage - 1) * pageSize; //7
  const endIndex = startIndex + pageSize;
  const currentTasks = tasks.slice(startIndex, endIndex);

  console.log("Current Tasks:", currentTasks); // Verifica las tareas actuales que se muestran

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const pendingTaskCount = tasks.filter(
    (task) => task.completed === false
  ).length;

  const allTaskCompleted = () => {
    if (pendingTaskCount === 0 && tasks.length > 0) {
      return toast.success("Congratulations! all tasks completed!");
    }
  };

  useEffect(() => {
    allTaskCompleted();

    // Calcula el número de páginas
    const totalPages = Math.ceil(tasks.length / pageSize);

    // Si hay menos de 7 tareas, establece la página actual en 1
    if (tasks.length <= pageSize && currentPage !== 1) { //Si hay 7 o menos tareas y la página actual no es la 1
      setCurrentPage(1);
    }

    // Si la página actual es mayor al total de páginas, vuelve a la última página disponible
    
  }, [tasks]);

  return (
    <div class="relative flex w-[900px] m-auto h-[560px] mt-5 shadow-custom  transistion overflow-hidden rounded-lg p-[1px] focus:outline-none">
       <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
              <span class=" h-full w-full cursor-pointer  items-center justify-center m-auto rounded-lg   dark:bg-black px-7 text-sm font-medium dark:text-white backdrop-blur-3xl gap-2 undefined">
              <div className="ml-[72px]" >
        {currentTasks.map((task) => {
          if (!task || !task.description) {
            console.log("Invalid task:", task);
            return null;
          }
          return (
            <div
              key={task.id}
              className={
                task.completed
                  ? "shadow-md flex justify-between p-3 my-3  rounded-lg w-[700px] bg-green-200 dark:bg-cyan-300 "
                  : "bg-slate-100 shadow-md flex justify-between p-3 my-3 rounded-lg w-[700px] dark:bg-[#020617]  dark:text-white "
              }
            >
              <div className="flex items-center">
                <div className="checkbox-container mr-5">
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={`checkbox-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleCompleted(task.id)}
                  />
                </div>
                <div className="task-body">
                  <p
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.description.charAt(0).toUpperCase() +
                      task.description.slice(1)}
                  </p>
                </div>
              </div>
              <div className="buttons flex items-center">
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-blue-500 rounded-md p-1 text-white mr-3 hover:bg-blue-600 "
                >
                  <img src={edit} alt="" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 rounded-md p-1 text-white hover:bg-red-600 "
                >
                  <img src={trash} alt="" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[700px] justify-center mb-3 ml-10 flex px-5 dark:text-white ">
        <p className="mr-2">Tasks: {tasks.length}</p>
        <p className="mr-2">Completed: {completedTasksCount}</p>
        <p className="mr-2">Pending: {pendingTaskCount}</p>
      </div>
      {tasks.length > pageSize && (
        <Pagination
          className="custom-pagination ml-[320px] "
          current={currentPage}
          pageSize={pageSize}
          total={tasks.length}
          onChange={handlePageChange}
        />
      )}
      {tasks.length === 0 && (
        <div className="text-center mt-10">
          <p>No hay tareas</p>
          <button
            onClick={handleCreate}
            className="bg-blue-500 text-white p-2 rounded-lg mt-3"
          >
            ¡Crear tarea!
          </button>
        </div>
      )}

      </span>
      
    </div>
  );
}

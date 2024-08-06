import React from "react";
import { Pagination } from "antd";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import './TaskList.css';

export default function TaskList({
  tasks,
  deleteTask,
  setEditingTask,
  handleCreate,
  handleCompleted // Asegúrate de recibir handleCompleted como prop
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
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTasks = tasks.slice(startIndex, endIndex);

  console.log("Current Tasks:", currentTasks); // Verifica las tareas actuales que se muestran

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const completedTasksCount = tasks.filter(task => task.completed).length;
  const pendingTaskCount = tasks.filter(task => task.completed === false ).length

  return (
    <div className="m-auto flex flex-col items-center relative shadow-xl pt-12 w-[800px] h-[550px]">
      <div>
        {currentTasks.map((task) => {
          if (!task || !task.description) {
            console.log("Invalid task:", task); // Verifica si task es inválido
            return null; // O puedes manejarlo de otra manera si es necesario
          }
          return (
            <div
              key={task.id}
              className="flex justify-between shadow-md px-5 m-2 bg-white items-center w-[700px]"
            >
              <div className="body-task flex items-center">
                <div className="checkbox-container mr-5">
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={`checkbox-${task.id}`}
                    checked={task.completed}
                    onChange={() => handleCompleted(task.id)} // Llama a handleCompleted al hacer clic
                  />
                </div>
                <div className="task-body">
                  <p className={task.completed ? ' line-through text-slate-500 ' : '' } >
                    {task.description.charAt(0).toUpperCase() +
                      task.description.slice(1)}
                  </p>
                  
                </div>
              </div>
              <div className="buttons items-center">
                <button
                  onClick={() => setEditingTask(task)}
                  className="bg-blue-500 rounded-md p-1 text-white mr-3"
                >
                  <img src={edit} alt="" />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 rounded-md p-1 text-white"
                >
                  <img src={trash} alt="" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[700px] justify-center mb-3 flex px-5">
        <p className="mr-2" >Tasks: {tasks.length}</p>
        <p className="mr-2">Completed: {completedTasksCount} </p>
        <p className="mr-2">Pending: {pendingTaskCount} </p>
      </div>
      {tasks.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={tasks.length}
          onChange={handlePageChange}
        />
      )}
      {tasks.length === 0 && (
        <div>
          <p>There are no tasks</p>
          <button onClick={handleCreate}>Create task!</button>
        </div>
      )}
    </div>
  );
}

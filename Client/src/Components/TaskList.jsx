import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

export default function TaskList({ tasks, deleteTask, setEditingTask }) {
  // Asegúrate de que tasks es un array
  if (!Array.isArray(tasks)) {
    console.log('Invalid tasks array:', tasks); // Verifica si tasks no es un array
    return null;
  }

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Calcular las tareas para la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTasks = tasks.slice(startIndex, endIndex);

  console.log('Current Tasks:', currentTasks); // Verifica las tareas actuales que se muestran

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='m-auto flex flex-col items-center shadow-xl pt-12 w-[800px] h-[550px]'>
      <div>
        {currentTasks.map(task => {
          if (!task || !task.title) {
            console.log('Invalid task:', task); // Verifica si task es inválido
            return null; // O puedes manejarlo de otra manera si es necesario
          }
          return (
            <div key={task.id} className='flex justify-between shadow-md px-5 m-2 bg-white items-center w-[700px]'>
              <div className="task-body">
                <p>{task.title}</p>
                <p>{task.description}</p>
              </div>
              <div className="buttons">
                <button onClick={() => setEditingTask(task)} className='bg-blue-500 w-[80px] p-1 text-white mr-3'>Edit</button>
                <button onClick={() => deleteTask(task.id)} className='bg-red-500 w-[80px] p-1 text-white'>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      {tasks.length > pageSize && ( // Mostrar la paginación solo si hay 7 o más tareas
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={tasks.length}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

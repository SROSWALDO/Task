import React from 'react'

export default function TaskList({tasks, deleteTask}) {
  return (
    <div>
        <h1>TaskList</h1>
        {tasks.map(task =>(
            <div className='card w-full bg-black/70 my-3 p-2 flex justify-between ' key={task.id}>
                <div className="task-data">
                <p>{task.title}</p>
                <p>{task.description}</p>
                </div>

                <div className="buttons flex items-center ">
                    <button className='mr-2 w-[80px] p-1 rounded bg-orange-400 ' >Edit</button>
                    <button onClick={() => deleteTask(task.id) } className=' p-1 rounded bg-red-700 w-[80px] ' >Delete</button>
                </div>
            </div>
        ))}
    </div>
  )
}

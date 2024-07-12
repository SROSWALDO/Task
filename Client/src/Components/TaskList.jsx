import React from 'react'

export default function TaskList({tasks}) {
  return (
    <div>
        <h1>TaskList</h1>
        {tasks.map(task =>(
            <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
        ))}
    </div>
  )
}

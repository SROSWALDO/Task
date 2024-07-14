import React from 'react'

export default function Navbar() {
  return (
    <div className='flex justify-around h-14 items-center shadow-sm relative shadow-black ' >
        <div className="logo">
            LOGO
        </div>
        <div className="buttons">
            <a href="/create">
            <button className='' >Create Task</button>
            </a>
            <button className=' absolute right-10 ' >About me</button>
        </div>

    </div>
  )
}

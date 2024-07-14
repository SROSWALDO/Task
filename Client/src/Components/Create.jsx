import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Create() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/task", formData);
    } catch (error) {
      console.log(error);
    }
    navigate('/')
    
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center ">
        <input
          value={formData.title}
          onChange={handleChange}
          name="title"
          className=" outline-none bg-black/80 w-[600px] p-4 rounded-2xl "
          type="text"
        />
        <input
          value={formData.description}
          onChange={handleChange}
          type="text"
          className=" outline-none bg-black/80 w-[600px] p-4 rounded-2xl "
          name="description"
        />
        <button
          className="bg-blue-800 w-[100px] rounded-2xl ml-4 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

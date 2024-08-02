import React from "react";
import { Modal } from "antd";
import useStore from "./Store";

export default function Navbar({ handleCreate }) {
  return (
    <div className="flex justify-around h-14 items-center shadow-md relative">
      <div className="logo">LOGO</div>
      <div className="buttons flex items-center ">
        <button onClick={handleCreate} >Create Task</button>
        <button className="absolute right-10">About me</button>
      </div>
    </div>
  );
}

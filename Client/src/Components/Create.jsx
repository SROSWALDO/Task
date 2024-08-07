import React, { useEffect } from "react";
import { ConfigProvider, Modal } from "antd";
import useStore from "./Store";

export default function Create({ isModalOpen, handleCancel, handleSave }) {
  const { formData, setFormData, resetFormData, editingTask, setEditingTask } =
    useStore();

  useEffect(() => {
    if (editingTask) {
      setFormData({
        description: editingTask.description,
      });
    } else {
      resetFormData();
    }
  }, [editingTask, setFormData, resetFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(formData, editingTask ? editingTask.id : null);
    setEditingTask(null);
    resetFormData();
    handleCancel();
  };

  return (
    <ConfigProvider>
      <Modal
        className="dark:bg-gray-700"
        centered
        width={800}
        open={isModalOpen}
        onCancel={() => {
          resetFormData();
          setEditingTask(null);
          handleCancel();
        }}
        footer={null}
      >
        <div className="flex justify-center items-center  h-[250px] dark:bg-[#242424]">
          <form onSubmit={handleSubmit} className="w-full max-w-[500px]  ">
            <div className="mb-4">
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descripción"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              {editingTask ? "Actualizar" : "Enviar"}
            </button>
          </form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

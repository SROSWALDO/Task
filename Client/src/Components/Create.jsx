import React, { useEffect } from "react";
import { ConfigProvider, Modal } from "antd";
import useStore from "./Store";

export default function Create({ isModalOpen, handleCancel, handleSave }) {
  const { formData, setFormData, resetFormData, editingTask, setEditingTask } = useStore();

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
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
        width={900}
        open={isModalOpen}
        onCancel={() => {
          resetFormData();
          setEditingTask(null);
          handleCancel();
        }}
        footer={null}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
          <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "500px" }}>
            <div style={{ marginBottom: "16px" }}>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                type="text"
                style={{ width: "100%", padding: "8px", backgroundColor: "gray" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                type="text"
                style={{ width: "100%", padding: "8px", backgroundColor: "gray" }}
              />
            </div>
            <button
              type="submit"
              style={{ width: "100%", padding: "10px", backgroundColor: "#1890ff", color: "#fff", border: "none", borderRadius: "4px" }}
            >
              {editingTask ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      </Modal>
    </ConfigProvider>
  );
}

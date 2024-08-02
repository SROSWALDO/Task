import create from 'zustand';

const useStore = create(set => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  editingTask: null,
  setEditingTask: (task) => set({ editingTask: task }),

  // Estados globales para formData
  formData: {
    title: "",
    description: "",
  },
  setFormData: (formData) => set({ formData }),
  resetFormData: () => set({ formData: { title: "", description: "" } }),
}));

export default useStore;

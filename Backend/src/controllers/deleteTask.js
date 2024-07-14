const { Task } = require("../db");

const deleteTask = async (id) => {
    try {
        const removeTask = await Task.findOne({where: {id}});

        if(!removeTask) {
            throw new Error("Task not found")
        }

        await removeTask.destroy();

        return { message: "Task deleted successfully" }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = deleteTask;
const { Task } = require("../db");

const editTask = async  (id, newTaskData) => {
    try {
        
        const taskData = await Task.findOne({ where: { id } });

        if(taskData) {
            taskData.title = newTaskData.title;
            taskData.description = newTaskData.description;

            await taskData.save();
            return { success: true, task: taskData };
        } else {
            return { success: false, message: 'Task not found' };
        }

    } catch (error) {
        console.log(error.message);
    }

}

module.exports = editTask;
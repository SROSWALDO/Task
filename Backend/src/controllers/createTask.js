const { Task } = require("../db");

const createTask = async (taskData) => {
    try {
        const { title, description } = taskData;

        const newTask = await Task.create({
            title,
            description,
        })

        return newTask;
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = createTask;
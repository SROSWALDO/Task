const { Task } = require("../db");

const createTask = async (taskData) => {
    try {
        const { description } = taskData;

        const newTask = await Task.create({
            description,
        })

        return newTask;
        
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = createTask;
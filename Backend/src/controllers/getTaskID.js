const { Task } = require("../db");

const getTask = async (id) => {
    try {
        const taskID = Task.findOne({ where: { id } });

    if(!taskID) {
        return console.log("Task not found");
    }

    return taskID;
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = getTask;
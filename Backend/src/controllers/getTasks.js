const { Task } = require("../db");

const getTasks = async () => {
    try {
        const usuarios = await Task.findAll();
        return usuarios;
    } catch (error) {
        throw new Error(error.message)
        
    }
}

module.exports = getTasks;
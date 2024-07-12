const createTask = require("../controllers/createTask");

const createHandler = async (req,res) => {
    try {
        const taskData = req.body;

        const newTask = await createTask(taskData);
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear la tarea" })
        
    }
}

module.exports = createHandler;
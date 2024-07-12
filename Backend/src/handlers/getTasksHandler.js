const getTasks = require('../controllers/getTasks');

const getTasksHandler = async (req, res) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message })
        
    }
}

module.exports = getTasksHandler;
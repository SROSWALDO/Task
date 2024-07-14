const editTask = require('../controllers/editTask');

const editTaskHandler = async (req,res) => {
    try {
        const { id } = req.params;
        const newTaskData = req.body;

        const task = await editTask(id, newTaskData);

        res.status(200).json(task);
    } catch (error) {
        console.log("Error updating cart", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = editTaskHandler;
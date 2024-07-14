const deleteTask = require("../controllers/deleteTask");

const deleteHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).send("Not found id")
        }

        const deletedTask = await deleteTask(id);
        return res.json(deletedTask);
    } catch (error) {
        console.log("Error deleting task");
        return res.status(500).json({ message: "Internal server error" })
        
    }
}

module.exports = deleteHandler;
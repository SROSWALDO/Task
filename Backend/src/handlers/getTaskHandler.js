const getTaskID = require('../controllers/getTaskID');

const getTaskHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.status(404).send("Not found id")
        }

        const taskID = await getTaskID(id);

        return res.json(taskID)
    } catch (error) {
        console.log("Internal server error");
    }
}

module.exports = getTaskHandler;
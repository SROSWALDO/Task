const { Router } = require('express');
const createHandler = require('../handlers/createHandler');
const getTasksHandler = require('../handlers/getTasksHandler');
const deleteHandler = require('../handlers/deleteHandler');
const getTaskHandler = require('../handlers/getTaskHandler');
const editTaskHandler = require('../handlers/editTaskHandler');


const router = Router();

router.post("/task", createHandler);
router.get("/task", getTasksHandler);
router.delete("/task/:id", deleteHandler);
router.get("/task/:id", getTaskHandler)
router.put("/task/:id", editTaskHandler);



module.exports = router;
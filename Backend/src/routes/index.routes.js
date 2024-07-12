const { Router } = require('express');
const createHandler = require('../handlers/createHandler');
const getTasksHandler = require('../handlers/getTasksHandler');


const router = Router();

router.post("/task", createHandler );
router.get("/task", getTasksHandler);



module.exports = router;
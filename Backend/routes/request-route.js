const express = require('express');
const router = express.Router();
const { createRequest,getRequestsByOfferedUser } = require('../controller/createRequest.controller');

router.post('/request', createRequest);
router.get("/request/by-user/:user_id", getRequestsByOfferedUser);

module.exports = router;

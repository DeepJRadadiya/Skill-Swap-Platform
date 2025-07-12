const express = require('express');
const router = express.Router();
const { createRequest,getRequestsForLoggedInUser,updateRequestStatus } = require('../controller/createRequest.controller');

router.post('/request', createRequest);
router.get("/requests/user/:user_id", getRequestsForLoggedInUser);
router.patch("/update/:request_id/status", updateRequestStatus);

module.exports = router;

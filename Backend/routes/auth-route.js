const express = require('express');
const router = express.Router();
const authcontrollers = require('../controller/user.controller');
const validate = require('../middlewares/validate_midelware');
// const authMiddleware = require('../midellwares/authMiddleware');
const {loginSchema} = require('../validators/auth-validator');
const upload = require("../middlewares/upload.middleware");
// const forgotPassword = require('../contoller/forgotPassword-controller');

// router.route("/").get(authcontrollers.home);


// router
//     .route('/user')
//     .get(authMiddleware,authcontrollers.userdata);
// router
//     .route('/testuser')
//     .get(authcontrollers.testuser);

router
    .route("/register")
    .post(authcontrollers.register);

// router
//     .route("/user/update/:id")
//     .patch(authcontrollers.updatetUserById);
    
router
    .route("/login")
    .post(validate(loginSchema),authcontrollers.login);
    
router
    .route("/usersDetails")
    .get(authcontrollers.getAllUsersWithSkills);

router.patch("/user/update", upload.single("profile_photo"), authcontrollers.updateUserProfile);



module.exports = router;
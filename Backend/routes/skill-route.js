const express = require('express');
const router = express.Router();
const skillcontroller = require('../controller/skill.controller');
const validate = require('../middlewares/validate_midelware');
const {skillSchema} = require('../validators/skill-validator');


router
    .route("/createskill")
    .post(validate(skillSchema),skillcontroller.createSkill);

router
    .get("/getskill")
    .post(skillcontroller.getAllSkills);

router
    .route("/bulk")
    .post(skillcontroller.insertManySkills);

module.exports = router;
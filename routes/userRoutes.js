const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const { login, signup } = userController;

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;

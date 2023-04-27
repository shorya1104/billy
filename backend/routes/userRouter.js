const router = require("express").Router()
const userController = require("../controller/userController.js");
const authentication = require("../middleware/verifyToken");
// const { userValidationRules, validate } = require("../middleware/validation");


// Registration
router.post("/register",userController.createUser)
// Login
router.post("/login", userController.Login)
//logut
router.post("/logout" ,authentication, userController.Logout)
// Update
router.post("/update",authentication,userController.updateUser)

module.exports = router;
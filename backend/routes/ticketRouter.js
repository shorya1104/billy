const router = require("express").Router();
const ticketController = require("../controller/ticketController");
const upload = require("../utils/multer");
const authentication = require("../middleware/verifyToken");
const { userValidationRules, validate } = require("../middleware/validation");

// CREATE NEW ticket
router.post(
  "/create",
  authentication,
  // validate,
  // userValidationRules(),
  // upload.single("ticket"),
  ticketController.createTicket
);


// DELETE BLOG
// router.post(
//   "/delete",
//   authentication,
//   blogController.deleteBlog
// );

// GET ALL BLOG
router.post(
  "/getTicketlist",
  
  
  ticketController.getAllTicket
);
// GET  BLOG
// router.post(
//   "/get",
//   authentication,
//   blogController.getBlog
// )

// router.post(
//   "/getBlog",
  
//   blogController.getBlog
// )

// UPDATE POST
// router.post(
//   "/update", 
//   authentication,
//   validate,
//   userValidationRules(),
//   upload.single("image"),
//   blogController.updateBlog
// );

// router.post(
//   "/updateblog", 
//   validate,
//   userValidationRules(),
//   upload.single("user_image"),
//   blogController.updateBlog
// );


module.exports = router;

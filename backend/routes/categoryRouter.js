const router = require("express").Router();
const categoryController = require("../controller/categoryController");
const upload = require("../utils/multer");
const authentication = require("../middleware/verifyToken");
const { userValidationRules, validate } = require("../middleware/validation");

// CREATE NEW Offer
router.post(
  "/create",
  authentication,    
categoryController.createCategory
);


// // DELETE BLOG
// router.post(
//   "/deleteoffer",
//   authentication,
//   offerController.deleteOffer
// );

// GET ALL CATEGORY
router.post(
  "/get-all",
  authentication,
  categoryController.getAllCategory
);

// GET ALL CATEGORY
router.post(
  "/getallcategory",
  // authentication,
  categoryController.getAllCategory
);


//GET ALL COLUMN DATA FROM TWO MODEL
// router.post(
//   "/getalldata",
//   authentication,
//   offerController.getAllOfferData
// );

//GET TICKET DATA 
// router.post(
//   "/get-Ticket-Data",
//   authentication,
//   offerController.getTicketData
// );


// GET SINGLE OFFER BY ID
// router.post(
//   "/get",
//   authentication,
//   offerController.getOffer  
// );

// router.post(
//   "/updateoffer", 
//   // validate,
//   userValidationRules(),
//   upload.single("offer"),
//   offerController.updateOffer
// );

// DELETE OFFER


module.exports = router;

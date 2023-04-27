const router = require("express").Router();
const offerController = require("../controller/offerController");
const upload = require("../utils/multer");
const authentication = require("../middleware/verifyToken");
const { userValidationRules, validate } = require("../middleware/validation");

// CREATE NEW Offer
router.post(
  "/create",
  authentication,    
  // validate,
  // userValidationRules(),
  upload.single("offer"),
offerController.createOffer
);


// // DELETE BLOG
router.post(
  "/deleteoffer",
  authentication,
  offerController.deleteOffer
);

// GET ALL OFFER
router.post(
  "/get-all",
  authentication,
  offerController.getAllOffer
);


//GET ALL COLUMN DATA FROM TWO MODEL
router.post(
  "/getalldata",
  authentication,
  offerController.getAllOfferData
);

//GET TICKET DATA 
router.post(
  "/get-Ticket-Data",
  authentication,
  offerController.getTicketData
);


// GET SINGLE OFFER BY ID
router.post(
  "/get",
  authentication,
  offerController.getOffer  
);

router.post(
  "/updateoffer", 
  // validate,
  userValidationRules(),
  upload.single("offer"),
  offerController.updateOffer
);

// DELETE OFFER


module.exports = router;

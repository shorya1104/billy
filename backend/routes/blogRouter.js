const router = require("express").Router();
const blogController = require("../controller/blogController.js");
const upload = require("../utils/multer");

const authentication = require("../middleware/verifyToken");
const { userValidationRules, validate } = require("../middleware/validation");

// CREATE NEW BLOG
router.post(
  "/create",
  authentication,
  // validate,
  // userValidationRules(),
  upload.single("blog"),
  blogController.createBlog
);
router.post(
  "/blogimageupload",
 upload.single('blog'),
 blogController.uploadImages
 );

// DELETE BLOG
router.post(
  "/delete",
  authentication,
  blogController.deleteBlog
);

// GET ALL BLOG
router.post(
  "/get-all",
  authentication,
  blogController.getAllBlog
);
// GET  BLOG
router.post(
  "/get",
  authentication,
  blogController.getBlog
);

// GET  BLOG
router.post(
  "/getsingleblog",
  // authentication,
  blogController.getBlog
);

// UPDATE Blog
router.post(
  "/update", 
  authentication,
  // validate,
  // userValidationRules(),
  upload.single("blog"),
  blogController.updateBlog
);

//GET LATEST BLOG
router.post(
  "/get-latest",
  // authentication,
  blogController.getLatestBlog
);

//GET BLOG BY CATEGORY
router.post(
  "/getbycategory",
  authentication,
  blogController.getBlogCategory
);


//GET BLOG BY CATEGORY
router.post(
  "/getbycategoryblog",
  // authentication,
  blogController.getBlogCategory
);

//GET POPULAR POST
router.post(
  "/getpopularblog",
  // authentication,
  blogController.getPopularBlog
);



// router.post(
//   "/updateblog", 
//   validate,
//   userValidationRules(),
//   upload.single("user_image"),
//   blogController.updateBlog
// );



module.exports = router;

const db = require("../config/sequelize");
const Ticket = db.ticket;
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const { Z_DATA_ERROR } = require("zlib");
// const ext = req.file.originalname.split(".")[1];
// const newfileName = `${Date.now() + req.data._id}.${ext}`;

// CREATE NEW Ticket
exports.createTicket = async (req, res) => {
  let data = req.body
  data.forEach(element => {
    element.user_id = req.user.user_id
  });
  try {
    const data = await Ticket.bulkCreate(req.body)
    res.status(200).json({
      status: "success",
      // data
    });

  } catch (err) {
    res.status(500).json({
      status: "false",
      message: "Please check data can't be duplicated"
    });
  }
};

// // Delete a user by id
exports.deleteBlog = async (req, res) => {
  const data = await Blog.findByPk(req.body.user_id);

  try {
    await Blog.destroy({ where: { user_id: req.body.user_id } });
    fs.unlinkSync(`upload/ticket/${data.blog_url}`);
    res.status(200).json({ message: "User deleted Sucessfully", data });
  } catch (err) {
    res.status(500).json({ err, message: "Something went to Wrong" });
  }
};

//GET ALL Ticket
exports.getAllTicket = async (req, res) => {
  console.log("sdfihsiudhiuh")
  try {
    const data = await Ticket.findAll();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET SINGLE BLOG
exports.getBlog = async (req, res) => {
  try {
    const data = await Blog.findOne({
      where: { blog_id: req.body.blog_id },
    });
    if (!data) {
      return res
        .status(200)
        .json({ status: "success", message: "Record not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Record found", data });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//UPDATE BLOG
exports.updateBlog = async (req, res) => {
  console.log(req.body)
  let newImage = "";
  const data = await Blog.findByPk(req.body.id);
  // if (req.file) {
  //   console.log("file upload kru")
  //   // newImage = req.file.filename;
  //   // fs.unlinkSync(`upload/${data.blog_url}`);
  // }
  console.log(newImage)
  const updateBlog = {
    title_name: req.body.title_name || data.title_name,
    author_name: req.body.author_name || data.author_name,
    // date: new Date()|| data.date,
    blog_description: req.body.blog_description || data.blog_description,
    blog_url: newImage || data.blog_url,
  };
  try {
    await Blog.update(updateBlog, { where: { blog_id: req.body.id } });
    return res.status(201).json({ status: "success", message: "Blog update successfully." });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Something went to Wrong" });
  }
};

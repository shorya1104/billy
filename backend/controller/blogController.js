const db = require("../config/sequelize");
const Blog = db.blog;
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const { Op } = require('sequelize');

// const ext = req.file.originalname.split(".")[1];
// const newfileName = `${Date.now() + req.data._id}.${ext}`;

const sharp = require("sharp");
const path=require("path");

// CREATE NEW BLOG
exports.createBlog = async (req, res) => {
  console.log(req.user.user_id)
  if(!req.file){
   return res.status(400).json({status:"failed",message:"Please select image"})
  }
  const blog = {
    title_name: req.body.title_name,
    meta_title: req.body.meta_title,
    meta_description: req.body.meta_description,
    meta_keyword: req.body.meta_keyword,

    blog_description: req.body.blog_description,
    blog_block:req.body.blog_block,
    blog_plaintxt:req.body.blog_plaintxt,
    
    blog_url: req.file.filename,
    category_name:req.body.category_name,
    date: new Date(),
    user_id: req.user.user_id,
  };
  console.log(blog)
  // return;

  try {
    const data = await Blog.create(blog);
    res.status(200).json({
      status: "success",
      message: "New Blog create successfully.",
      // data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.uploadImages=async(req,res)=>{
 // Set the desired width of the output image
 const width = 800;
  
 // Set the desired quality of the output image (0-100)
 const quality = 80;
 var newfilename='';
 if (req.file) {
   let ext = `${req.file.mimetype}`.split("/")[1];
   newfilename= `blog_${Date.now()}.${ext}`;
 await sharp(req.file.path)
   .resize(width)
   .jpeg({ quality })
   .toFile(`./upload/blog/${newfilename}`, (err, info) => {
     if (err) {
       console.error(err);
     } else {
       console.log(info);
       fs.unlinkSync(req.file.path);
       res.send({status:true,message:'Image uploaded successfully',url:"http://localhost:8000/upload/blog/"+newfilename});
    
     }
   });
 }else{
   res.send({status:false,message:'Please select image'});
 }
 
}
// // Delete a blog by id
exports.deleteBlog = async (req, res) => {
  const data = await Blog.findByPk(req.body.blog_id);
  console.log(await Blog.findByPk(req.body.blog_id));

  try {
    await Blog.destroy({ where: { blog_id: req.body.blog_id } });
    if (req.file) {
      if (fs.existsSync(`upload/blog/${data.blog_url}`)) {
        fs.unlinkSync(`upload/blog/${data.blog_url}`);
      }
    }
    res.status(200).json({ message: "Blog deleted Sucessfully", data });
  } catch (err) {
    // console.log(err)
    res.status(500).json({ err, message: "Something went to Wrong" });
  }
};

//GET ALL BLOG
exports.getAllBlog = async (req, res) => {
  console.log("sdfihsiudhiuh")
  try {
    const data = await Blog.findAll({
      order: [
        ['createdAt', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
       ],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET SINGLE BLOG
exports.getBlog = async (req, res) => {
  try {
    const data = await Blog.findByPk(req.body.blog_id);
    data.count += 1;
    await data.save();
    console.log(data);
    const data1 = await Blog.findOne({
      where: { blog_id: req.body.blog_id },
    });
    if (!data1) {
      return res
        .status(200)
        .json({ status: "success", message: "Record not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Record found", data1 });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//UPDATE BLOG
exports.updateBlog = async (req, res) => {
  // console.log(req.body)
  let newImage = "";
  // const data = await Blog.findByPk(req.body.blog_id);
  // console.log(data)
  const data = req.body;
  // console.log(data)
  if (req.file) {
    newImage = req.file.filename;
    if (fs.existsSync(`upload/blog/${data.blog_url}`)) {
      fs.unlinkSync(`upload/blog/${data.blog_url}`);
    }
  }
  const updateBlog = {
    title_name: req.body.title_name || data.title_name,
    // author_name: req.body.author_name || data.author_name,
    // date: new Date()|| data.date,
    blog_block:req.body.blog_block || data.blog_block,
    blog_plaintxt:req.body.blog_plaintxt || data.blog_plaintxt,
    blog_description: req.body.blog_description || data.blog_description,
    blog_url: newImage==""? data.blog_url:newImage,
    meta_title: req.body.meta_title || data.meta_title,
    meta_description: req.body.meta_description || data.meta_description,
    meta_keyword: req.body.meta_keyword || data.meta_keyword,
    category_name : req.body.category_name || data.category_name

  };
  console.log("dataupo",updateBlog)
  try {
    await Blog.update(updateBlog, { where: { blog_id: req.body.blog_id } });
    return res.status(201).json({status:"success",message:"Blog update successfully."});
  } catch (error) {
    return res.status(500).json({ status:"failed", message: "Something went to Wrong" });
  }
};

//GET LATEST THREE BLOG

exports.getLatestBlog = async (req, res) => {
  console.log("sdfihsiudhiuh")
  try {
    const data = await Blog.findAll({
      limit: 3,
      order: [
        ['createdAt', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
       ],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET BLOG BY CATEGORY
exports.getBlogCategory = async (req, res) => {
  try {
    const data = await Blog.findAll({
      where: { category_name: req.body.category_name },
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

//GET POPULAR BLOG 

exports. getPopularBlog = async (req,res) =>{
  try{
    // const data = await Blog.findByPk(req.body.blog_id);
    // data.count += 1;
    // await data.save();
    
    const popularBlogs = await Blog.findAll({
      // where: { count: { [Op.gt]: count } },
      order: [['count', 'DESC']],
      limit: 3
      
    });
    
    if (!popularBlogs || popularBlogs.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No popular blog found"
      });
    }
    console.log(popularBlogs)
    return res.status(200).json({
      status: "success",
      message: "Popular blogs found",
      data: popularBlogs
    });
  }catch(err){
    console.log(err)
    return res.status(500).json(err);
    
  }
};


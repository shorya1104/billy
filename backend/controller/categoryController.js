const db = require("../config/sequelize");
const Category = db.category;
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");
const fs = require("fs");
const { QueryTypes } = require('sequelize');
const { sequelize } = require("../config/sequelize");

// const ext = req.file.originalname.split(".")[1];
// const newfileName = `${Date.now() + req.data._id}.${ext}`;


// CREATE NEW CATEGORY
exports.createCategory = async (req, res) => {
  const category = {
    category_name: req.body.category_name,
    user_id: req.user.user_id
    
  };
  console.log(category)
  try {
    const data = await Category.create(category);
    res.status(200).json({
      status: "success",
      message: "New category create successfully.",
      data,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// // // Delete single category
exports.deleteOffer = async (req, res) => {
  console.log(req.body.offer_id)
  const data = await Offer.findByPk(req.body.offer_id);
 try {
    await Offer.destroy({ where: { offer_id: req.body.offer_id } });
    // fs.unlinkSync(`upload/offer${data.offer_url}`);
    if (fs.existsSync(`upload/offer/${data.offer_url}`)) {
        fs.unlinkSync(`upload/offer/${data.offer_url}`);
    }
    res.status(200).json({ message: "User deleted Sucessfully", data });
  } catch (err) {
   res.status(500).json({ err, message: "Something went to Wrong",err });
  }
};

// //GET ALL Offer
exports.getAllCategory = async (req, res) => {
  // console.log("sdfihsiudhiuh")
  try {
    const data = await Category.findAll({
      order: [
        ['updatedAt', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
       ],
    }
      
    );
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};


//GET ALL DATA ACCORDING TO TICKET
exports.getTicketData = async (req, res) => {
  // console.log("sdfihsiudhiuh")
  try {
    const data = await sequelize.query(`
    Select billy_1.tickets.ticketid ,
    billy_1.tickets.announcement_date,
    billy_1.Categorys.offer_name,
    billy_1.offers.offer_url,
    billy_1.offers.end_date,
    billy_1.tickets.createdAt
    from billy_1.tickets inner join billy_1.offers on billy_1.tickets.offername =  billy_1.offers.offer_id ORDER BY  billy_1.tickets.createdAt DESC;`, {
      replacement: "",
      type: QueryTypes.Select
    })
    return res.status(200).json(data[0]);

  } catch (err) {
    return res.status(500).json(err);
  }
};

//Get ALL DATA FROM TWO TABLE.
exports.getAllOfferData = async (req, res) => {
  // console.log("sdfihsiudhiuh")
  try {
    const data = await sequelize.query(`
    Select *
    from billy_1.tickets inner join billy_1.offers on billy_1.tickets.offername =  billy_1.offers.offer_id;`, {
      replacement: "",
      type: QueryTypes.Select
    })
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json(err);
  }
};


// //GET SINGLE Offer
exports.getOffer = async (req, res) => {
  try {
    const data = await Offer.findOne({
      where: { offer_id: req.body.offer_id },
    });
    // console.log(data);
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

// //UPDATE Offer
exports.updateOffer = async (req, res) => {
   
  let newImage = "";
  let data = req.body;//await Offer.findByPk(req.body.offer_id);
  // data = data._previousDataValues
  if (req.file) {
    newImage = req.file.filename;
    if (fs.existsSync(`upload/offer/${data.offer_url}`)) {
      fs.unlinkSync(`upload/offer/${data.offer_url}`);
    }
    console.log("Image Inner url",newImage);
  }


 // console.log("Image url",newImage);
 // return;
  const updateOffer = {
    id:data.id,
    offer_name: req.body.offer_name || data.offer_name,
    offer_code: req.body.offer_code || data.offer_code,
    start_date: req.body.start_date || data.start_date,
    end_date: req.body.end_date || data.end_date,
    offer_url: newImage==""? data.offer_url:newImage
  };
  console.log("dataupo", updateOffer)
  try {
    await Offer.update(updateOffer, { where: { Offer_id: req.body.offer_id } });
    return res.status(200).json({ status: "success", message: "Offer update successfully." });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "Something went to Wrong" });
  }
};

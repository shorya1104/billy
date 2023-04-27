const db = require("../config/sequelize");
const User = db.user;
const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

// Registration
exports.createUser = async (req, res) => {
  const user = {
    user_email: req.body.user_email,
    user_password: CryptoJS.AES.encrypt(
      req.body.user_password,
      process.env.SECURITY_KEY
    ).toString(),
  };
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Login
exports.Login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(200).json({ status: "failed", message: "Pleases enter data" })
  }

  try {
    const user = await User.findOne({
      where: { user_email: email },
    });
    if (!user) {
      return res.send({status:false,isLogin: false,message:"User does not exist"});
    }
    const bytes = CryptoJS.AES.decrypt(
      user.user_password,
      process.env.SECURITY_KEY
    );
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword === password) {
      accessToken = JWT.sign(
        { user_id: user.user_id },
        process.env.SECURITY_KEY,
        {
          expiresIn: "1d",
        }
      );
      // await user.findByPk(req.params.id , {accessToken : [{accessToken , sign}]})

      return res.send({status:true, accessToken ,isLogin:true,email});
    } else {
      return res.send({ status:false, isLogin: false,message: "Password Incorrect" });
    }
  } catch (err) {
    console.log(err)
    return res.send({status:false,isLogin: false,message:err});
  }
};


//logout
exports.Logout = async (req, res , authentication) => {
  const token = req.headers.authorization.split(' ')[1]; // extract the token from the request headers
  // clear the user's session data or token from the backend storage
  // (e.g., by deleting the token from a database or cache)
  res.status(200).json({ message: 'Logout successful' }); 



};

// Update User
exports.updateUser = async (req, res) => {

  const user = await User.findByPk(req.body.id);
  if (req.body.user_password) {
    req.body.user_password = CryptoJS.AES.encrypt(
      req.body.user_password,
      process.env.SECURITY_KEY
    ).toString();
  }
  const updateUser = {
    user_email: req.body.user_email || user.user_email,
    user_password: req.body.user_password || user.user_password,
  };
  try {
    await User.update(updateUser, { where: { user_id: req.body.user_id } });
    return res
      .status(200)
      .json({ status: "success", message: "user updated successfully" });
  } catch (error) {
    return res
      .status(200)
      .json({ status: "failed", message: "something went wrong" });
  }
};

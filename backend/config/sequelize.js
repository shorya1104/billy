
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, 
  process.env.DATABASE_USER, 
  process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  // logging: false
});

sequelize
  .authenticate()
  .then(() => console.log("Database connect successfully"))
  .catch((err) => console.log(err));


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models
db.user = require("../models/user.js")(sequelize, Sequelize);
db.blog = require("../models/blog.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.js")(sequelize, Sequelize);
db.offer = require("../models/offer.js")(sequelize, Sequelize);
db.category = require("../models/category.js")(sequelize, Sequelize);


module.exports = db;
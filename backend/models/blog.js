module.exports = (sequelize, Sequelize) => {
  const blog = sequelize.define("blog", {
    blog_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title_name: {
      type: Sequelize.STRING(100),
    },
    author_name: {
      type: Sequelize.STRING(100),
    },
    date: {
      type: Sequelize.DATE,
    },
    blog_description: {
      type: Sequelize.STRING,
    },
    meta_title: {
      type: Sequelize.STRING,
    },
    meta_description: {
      type: Sequelize.STRING,
    },
    meta_keyword: {
      type: Sequelize.STRING,
    },
    blog_url: {
      type: Sequelize.STRING,
    },
    blog_block: {
      type: Sequelize.STRING,
    },
    blog_plaintxt: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    category_name:{
      type: Sequelize.STRING(100)
    },
    count:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
    }
  });
  blog.associate = (models) => {
    blog.belongsToMany(models.category, { through: 'category_name' });
  };
  return blog;
};

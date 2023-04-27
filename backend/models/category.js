module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("category", {
      category_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      category_name: {
        type: Sequelize.STRING(100),
      }
    });
    category.associate = (models) => {
      category.belongsToMany(models.blog, { through: 'category_id' });
    };
    return category;
  };
  
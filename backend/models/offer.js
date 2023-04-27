module.exports = (sequelize, Sequelize) => {
    const offer = sequelize.define("offer", {
      offer_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      offer_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      offer_code: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      offer_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      
    });
    offer.associate = (models) => {
      offer.belongsToMany(models.ticket, { through: 'offer_id' });
    };
  
 
    return offer;
  };
  
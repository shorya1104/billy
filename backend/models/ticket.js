module.exports = (sequelize, Sequelize) => {
    const ticket = sequelize.define("ticket", {
      ticket_primary_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      ticketid: {
        type: Sequelize.STRING(100),
        unique: true
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
       
      },
      mobile: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      announcement_date:{
        type: Sequelize.STRING(100),
      },
      authorName:{
        type: Sequelize.STRING(100), 
      },
      user_id: {
        type: Sequelize.STRING,
      },
      offername:{
        type: Sequelize.STRING(100)
      }
    });

    ticket.associate = (models) => {
      ticket.belongsToMany(models.offer, { through: 'offername' });
    };
    return ticket;
  };
  
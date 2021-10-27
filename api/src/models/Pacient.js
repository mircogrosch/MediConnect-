const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('pacient', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    num_member: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
  });
};
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('patient', {
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
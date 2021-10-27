const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('medicalHistory', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    },
    diagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    }  
  });
};
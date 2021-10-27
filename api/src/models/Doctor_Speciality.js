const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('doctorSpeciality', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey:true
    }   
  });
};
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      idDoctor:{
        type: DataTypes.STRING,
        allowNull:false
      },
      idPatient:{
        type:DataTypes.STRING,
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

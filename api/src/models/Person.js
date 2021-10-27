const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
    "person",
    {
      dni: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageProfile: {
        type: DataTypes.BLOB,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rol: {
        type: DataTypes.ENUM,
        values: ["Doctor", "Patient"],
      },
    },
    {
      timestamps: false,
    }
  );
};

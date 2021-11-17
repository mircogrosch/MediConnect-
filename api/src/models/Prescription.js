const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "prescription",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      medication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      how_much: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diagnostic: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

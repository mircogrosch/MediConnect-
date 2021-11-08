const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("allergy", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        max: 5,
        min: 1,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};

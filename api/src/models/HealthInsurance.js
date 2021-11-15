const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "healthInsurance",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.INTEGER,
      },
      province: {
        type: DataTypes.STRING,
      },
      plan: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      timestamps: false,
    }
  );
};

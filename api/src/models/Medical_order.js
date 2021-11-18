const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "medical_order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      medical_studies: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diagnostic: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

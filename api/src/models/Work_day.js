const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "work_day",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      init: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
      end: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    {
      timestamps: false,
    }
  );
};

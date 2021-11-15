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
        type: DataTypes.INTEGER, // 1 Lunes 2 Martes 5 Viernes
        allowNull: false,
      },
      init: {
        type: DataTypes.JSONB, // { hora: 8 , minutes: 30 }
        defaultValue: {},
      },
      end: {
        type: DataTypes.JSONB, // { hora: 12, minutes: 30 } 
        defaultValue: {}, 
      },
    },
    {
      timestamps: false,
    }
  );
};

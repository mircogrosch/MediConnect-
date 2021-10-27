const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "doctor",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      enrollment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /*
    signature: {
      type: DataTypes.,
      allowNull: false,
    },
    */
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

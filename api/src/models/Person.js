const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt-nodejs");

function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
}
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
        unique: true,
        validate: {
          isEmail: true,
        },
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

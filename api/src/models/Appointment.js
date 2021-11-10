const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "appointment",
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
        validate: {
          max: 31,
          min: 1,
        },
      },
      day_name: {
        type: DataTypes.ENUM({
          values: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
        }),
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 12,
          min: 1,
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 24,
          min: 00,
        },
      },
      hour_long: {
        type: DataTypes.STRING,
        get() {
          return `${this.getDataValue("hour")}:${
            this.getDataValue("minutes").toString().length > 1
              ? this.getDataValue("minutes")
              : "0" + this.getDataValue("minutes")
          }`;
        },
      },
      minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max: 59,
          min: 00,
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return `${this.getDataValue("day_name")} ${this.getDataValue(
            "day"
          )}/${this.getDataValue("month")}/${this.getDataValue("year")}`;
        },
      },
      payment_status: {
        type: DataTypes.ENUM({
          values: ["Pendiente", "Abonado"],
        }),
      },
    },
    {
      timestamps: false,
    }
  );
};

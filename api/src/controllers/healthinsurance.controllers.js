const { HealthInsurance } = require("../db");

const getHealthinsurance = async (req, res) => {
  try {
    const healthinsurance = await HealthInsurance.findAll();
    res.json({
      data: healthinsurance,
      message: "Obras Sociales de la BD",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

module.exports = { getHealthinsurance };
const { Speciality } = require("../db");

const getSpecialities = async (req, res) => {
  try {
    const specialities = await Speciality.findAll();
    res.json({
      data: specialities,
      message: "Especialidades de la BD",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

module.exports = { getSpecialities };

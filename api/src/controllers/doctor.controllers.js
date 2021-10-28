const { Person, Doctor } = require("../db");

const createDoctor = async (req, res) => {
  const {
    dni,
    name,
    lastname,
    address,
    imageProfile,
    email,
    password,
    enrollment,
    location,
  } = req.body;
  const rol = "Doctor";
  try {
    let newPerson = await Person.create(
      {
        dni,
        name,
        lastname,
        address,
        imageProfile,
        email,
        password,
        rol,
      },
      {
        fields: [
          "dni",
          "name",
          "lastname",
          "address",
          "imageProfile",
          "email",
          "password",
          "rol",
        ],
      }
    );
    let newDoctor = await Doctor.create(
      {
        enrollment,
        location,
      },
      {
        fields: ["enrollment", "location"],
      }
    );
    newDoctor.setPerson(dni);
    res.json({ data: [newPerson, newDoctor], message: "Doctor created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

module.exports = {
  createDoctor,
};

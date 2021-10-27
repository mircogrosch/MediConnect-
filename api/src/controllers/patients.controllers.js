const { Person, Patient } = require("../db");

const createPatient = async (req, res) => {
  const {
    dni,
    name,
    lastname,
    address,
    imageProfile,
    email,
    password,
    num_member,
  } = req.body;
  const rol = "Patient";
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
        ],
      }
    );
    let newPatient = await Patient.create(
      {
        num_member,
      },
      {
        fields: ["num_member"],
      }
    );
    newPatient.setPerson(dni);
    res.json({ data: [newPerson, newPatient], msg: "Patient created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      msg: "something goes wrong",
    });
  }
};

const getPatients = (req, res) => {
    res.json({ data: null, msg: "Ruta get Pacientes" });
};

const getPatient = () => {};

module.exports = { getPatient, getPatients, createPatient };

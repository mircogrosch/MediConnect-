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
    let newPatient = await Patient.create(
      {
        num_member,
      },
      {
        fields: ["num_member"],
      }
    );
    newPatient.setPerson(dni);
    res.json({ data: [newPerson, newPatient], message: "Patient created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getPatients = async (req, res) => {
  try {
    let patientsDB = await Patient.findAll({
      include: {
        model: Person,
      },
    });

    let patients = [];
    patientsDB.forEach((patient) => {
      let aux = {};
      for (let key in patient.dataValues) {
        if (key != "person") {
          aux[key] = patient.dataValues[key];
        } else {
          for (let key in patient.dataValues.person.dataValues) {
            aux[key] = patient.dataValues.person.dataValues[key];
          }
        }
      }
      patients.push(aux);
    });
    res.json({ data: patients, message: "Pacientes de la BD" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getPatient = () => {};

module.exports = { getPatient, getPatients, createPatient };

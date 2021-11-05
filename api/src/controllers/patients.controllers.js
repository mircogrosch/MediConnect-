const { Person, Patient, Doctor } = require("../db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

//Encriptar password
function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

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
    healthInsuranceId,
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
        password: encryptPassword(password),
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
    newPatient.setHealthInsurance(healthInsuranceId);
    res.json({ data: [newPerson, newPatient], message: "Patient created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: {
        id: id,
      },
      include: {
        model: Person,
      },
    });
    let patient_person = {};
    for (let key in patient.dataValues) {
      if (key != "person") {
        patient_person[key] = patient.dataValues[key];
      } else {
        for (let key in patient.dataValues.person.dataValues) {
          patient_person[key] = patient.dataValues.person.dataValues[key];
        }
      }
    }
    res.json({ data: patient_person, message: "Paciente de la BD" });
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

const getDoctor = async (req, res) => {
  const { name, id } = req.query;
  try {
    const patient = await Patient.findOne({
      where: {
        id: id,
      },
    });
    console.log(patient);
    let doctors = await patient
      .getDoctors({
        attributes: ["personDni"],
      })
      .then((element) => element.map((item) => item.personDni));
    let persons = await Person.findAll({
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            dni: {
              [Op.in]: doctors,
            },
          },
        ],
      },
    });
    res.json({ data: persons, message: "Lista de Doctores de un Paciente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findOne({
      where: {
        id: id,
      },
    });
    let doctors = await patient.getDoctors();
    let doctors_persons = [];
    for (let i = 0; i < doctors.length; i++) {
      let person = await Person.findOne({
        where: {
          dni: doctors[i].dataValues.personDni,
        },
      });
      for (let key in person.dataValues) {
        doctors[i].dataValues[key] = person.dataValues[key];
      }
      doctors_persons.push(doctors[i].dataValues);
    }
    res.json({
      data: doctors_persons,
      message: "Doctores de Paciente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const addDoctor = async (req, res) => {
  const { id } = req.params; // id de Paciente
  const { id_Doctor } = req.body; // id de Doctor
  let patient = await Patient.findOne({
    where: {
      id: id,
    },
  });
  try {
    await patient.addDoctor([id_Doctor]);
    res.json({
      data: patient,
      message: "Doctor añadido a lista de doctores de paciente",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDoctor = async (req, res) => {
  console.log("REq", req);
  const { id } = req.params; // id de Paciente
  const { id_Doctor } = req.query; // id de Doctor

  let patient = await Patient.findOne({
    where: {
      id: id,
    },
  });
  try {
    await patient.removeDoctor([id_Doctor]);
    res.json({
      data: patient,
      message: "Doctor borrado de la lista de doctores de paciente",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getDoctor,
  getDoctors,
  getPatient,
  getPatients,
  createPatient,
  addDoctor,
  deleteDoctor,
};

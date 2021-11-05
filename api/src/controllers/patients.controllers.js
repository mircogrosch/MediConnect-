const {
  Person,
  Patient,
  Doctor,
  HealthInsurance,
  Speciality,
} = require("../db");
const { Op } = require("sequelize");
const bcryptjs = require("bcryptjs");

const { deleteNotification } = require("./notification");
//Encriptar password
function encryptPassword(password) {
  return bcryptjs.hashSync(password, 10);
}

function concat_json(json, json_empty) {
  for (let key in json) {
    if (!Array.isArray(json[key])) {
      json_empty[key] = json[key];
    }
  }
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
  if (
    dni &&
    name &&
    lastname &&
    address &&
    email &&
    password &&
    num_member &&
    healthInsuranceId
  ) {
    try {
      let newPerson = await Person.create(
        {
          dni: parseInt(dni),
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
  } else {
    res
      .status(500)
      .json({ data: null, message: "No se enviaron todo los parametros" });
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

// http://localhost:3001/patient/doctors/id_Paciente
const getDoctors = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctor } = req.query;
    const doctors = await Person.findAll({
      where: {
        rol: "Doctor",
        name: doctor ? { [Op.like]: `%${doctor}%` } : { [Op.like]: "%%" },
      },
      include: {
        model: Doctor,
        required: true,
        include: [
          {
            model: Patient,
            where: {
              id: id,
            },
          },
          {
            model: Speciality,
          },
        ],
      },
    });
    const dni_linked_patient = doctors.map((doctor) => doctor.dataValues.dni);
    const doctors_unlinked = await Person.findAll({
      where: {
        rol: "Doctor",
        dni: {
          [Op.not]: dni_linked_patient,
        },
        name: doctor ? { [Op.like]: `%${doctor}%` } : { [Op.like]: "%%" },
      },
      include: {
        model: Doctor,
        include: {
          model: Speciality,
        },
      },
    });
    let json = {};
    // Se concatena la informacion en un solo json
    data = doctors.map((doctor) => {
      json = {};
      concat_json(doctor.dataValues, json);
      concat_json(doctor.dataValues.doctors[0].dataValues, json);
      json["specialities"] =
        doctor.dataValues.doctors[0].dataValues.specialities;
      return json;
    });
    // Se concatena la informacion en un solo json
    unlinked = doctors_unlinked.map((doctor) => {
      json = {};
      concat_json(doctor.dataValues, json);
      concat_json(doctor.dataValues.doctors[0].dataValues, json);
      json["specialities"] =
        doctor.dataValues.doctors[0].dataValues.specialities;
      return json;
    });
    res.json({
      data: data,
      unlinked: unlinked,
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
  const { id_Doctor, idNotification } = req.body; // id de Doctor
  let patient = await Patient.findOne({
    where: {
      id: id,
    },
  });
  try {
    await patient.addDoctor([id_Doctor]);
    deleteNotification(idNotification); //borra la notificación
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
  getDoctors,
  getPatient,
  getPatients,
  createPatient,
  addDoctor,
  deleteDoctor,
};

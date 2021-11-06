const { Person, Doctor, Patient, Speciality } = require("../db");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

//Encriptar password
function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const createDoctor = async (req, res) => {
  const {
    dni,
    name,
    lastname,
    address,
    image,
    email,
    password,
    enrollment,
    location,
    specialities, // tiene que ser un arreglo de id de specialties o un arreglo vacio
  } = req.body;
  const rol = "Doctor";
  if (
    dni &&
    name &&
    lastname &&
    address &&
    email &&
    password &&
    enrollment &&
    location &&
    specialities
  ) {
    try {
      let newPerson = await Person.create(
        {
          dni,
          name,
          lastname,
          address,
          imageProfile: image,
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
      let newDoctor = await Doctor.create(
        {
          enrollment,
          location,
        },
        {
          fields: ["enrollment", "location"],
        }
      );
      await newDoctor.setPerson(dni);
      if (specialities.length != 0) {
        await newDoctor.addSpecialities(specialities);
      }
      res.json({ data: [newPerson, newDoctor], message: "Doctor created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
        message: "something goes wrong",
      });
    }
  } else {
    res.status(500).json({
      data: null,
      message: "No se enviaron todos los parametros",
    });
  }
};

const getDoctors = async (req, res) => {
  let { name } = req.query;
  try {
    let doctorsDB;
    if (typeof name != "undefined") {
      name = name.toUpperCase();
      doctorsDB = await Doctor.findAll({
        include: [
          {
            model: Person,
          },
          {
            model: Speciality,
            where: {
              name: { [Op.like]: `%${name}%` },
            },
          },
        ],
      });
    } else {
      doctorsDB = await Doctor.findAll({
        include: [
          {
            model: Person,
          },
          {
            model: Speciality,
          },
        ],
      });
    }

    let doctors = [];
    doctorsDB.forEach((doctor) => {
      let aux = {};
      for (let key in doctor.dataValues) {
        if (key != "person") {
          aux[key] = doctor.dataValues[key];
        } else {
          for (let key in doctor.dataValues.person.dataValues) {
            aux[key] = doctor.dataValues.person.dataValues[key];
          }
        }
      }
      doctors.push(aux);
    });
    res.json({ data: doctors, message: "Doctores de la BD" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getDoctor = async (req, res) => {
  const { id } = req.params;
  try {
    const doctor = await Doctor.findOne({
      where: {
        id: id,
      },
      include: {
        model: Person,
      },
    });
    let doctor_person = {};
    for (let key in doctor.dataValues) {
      if (key != "person") {
        doctor_person[key] = doctor.dataValues[key];
      } else {
        for (let key in doctor.dataValues.person.dataValues) {
          doctor_person[key] = doctor.dataValues.person.dataValues[key];
        }
      }
    }
    res.json({ data: doctor_person, message: "Doctor de la BD" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getPatient = async (req, res) => {
  const { name, id } = req.query;
  try {
    const doctor = await Doctor.findOne({
      where: {
        id: id,
      },
    });
    let patients = await doctor
      .getPatients({
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
              [Op.in]: patients,
            },
          },
        ],
      },
    });
    res.json({ data: persons, message: "Lista de Pacientes de un Doctor" });
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
    const { id } = req.params;
    const doctor = await Doctor.findOne({
      where: {
        id: id,
      },
    });
    let patients = await doctor.getPatients();
    let patients_persons = [];
    for (let i = 0; i < patients.length; i++) {
      let person = await Person.findOne({
        where: {
          dni: patients[i].dataValues.personDni,
        },
      });
      for (let key in person.dataValues) {
        patients[i].dataValues[key] = person.dataValues[key];
      }
      patients_persons.push(patients[i].dataValues);
    }
    res.json({
      data: patients_persons,
      message: "Pacientes de Doctor",
    });
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
  getDoctor,
  getDoctors,
  getPatient,
  getPatients,
};

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

const getDoctors = async (req, res) => {
  try {
    let doctorsDB = await Doctor.findAll({
      include: {
        model: Person,
      },
    });

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
        model: Person
      }
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
  getPatients,
};

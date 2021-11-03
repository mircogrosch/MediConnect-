const { Person, Doctor, Patient, Speciality } = require("../db");
const { Op } = require("sequelize");

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
    specialities, // tiene que ser un arreglo de id de specialties o un arreglo vacio
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
};

/******************* getDoctors ******************
http://localhost:3001/doctor?dni=dni_Paciente
ej: http://localhost:3001/doctor?dni=999

res: {
    "data": [
        {
            "dni": 3738,
            "name": "Victorio",
            "lastname": "Galoeano",
            "address": "Calle falsa 123",
            "imageProfile": null,
            "email": "vito@hotmail.com",
            "password": "12345",
            "rol": "Doctor",
            "doctor": {
                "id": "d515c130-e0c7-417a-8a7a-13401b82714b",
                "enrollment": 12,
                "location": "Belgrano 125",
                "personDni": 3738
            }
        }
    ],
    "message": "Doctores de la BD"
}
*/
const getDoctors = async (req, res) => {
  let { name, dni } = req.query; // Nombre de especialidad , DNI de Paciente
  let doctors = null;
  try {
    if (typeof dni != "undefined") {
      const patient = await Patient.findOne({
        where: {
          personDni: dni,
        },
        include: {
          model: Doctor,
        },
      });
      let doctors_dni = await patient.getDoctors({
        attributes: ["personDni"],
      });
      doctors_dni = doctors_dni.map((doc) => doc.dataValues.personDni); // arreglo de dnis de Doctores
      if (typeof name !== "undefined") {
        doctors = await Person.findAll({
          where: {
            [Op.and]: [
              {
                dni: {
                  [Op.not]: doctors_dni,
                },
              },
              {
                rol: "Doctor",
              },
              {
                name: {
                  [Op.like]: `%${name}%`,
                },
              },
            ],
          },
          include: {
            model: Doctor,
          },
        });
      } else {
        doctors = await Person.findAll({
          where: {
            [Op.and]: [
              {
                dni: {
                  [Op.not]: doctors_dni,
                },
              },
              {
                rol: "Doctor",
              },
            ],
          },
          include: {
            model: Doctor,
          },
        });
      }
    } else {
      doctors = await Person.findAll({
        where: {
          rol: "Doctor",
        },
        include: {
          model: Doctor,
        },
      });
    }
    if (doctors.length === 0) {
      return res.json({
        data: doctors,
        message: "No se encontraron Doctores registrados",
      });
    }
    res.json({ data: doctors, message: "Todos los Doctores Registrados" });
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

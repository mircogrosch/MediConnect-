const {
  Person,
  Doctor,
  Patient,
  Speciality,
  HealthInsurance,
  Appointment,
} = require("../db");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

//Encriptar password
function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function concat_json(json, json_empty) {
  for (let key in json) {
    if (!Array.isArray(json[key])) {
      json_empty[key] = json[key];
    }
  }
}

const createDoctor = async (req, res) => {
  let result;
  const {
    dni,
    name,
    lastname,
    address,
    email,
    password,
    enrollment,
    location,
    specialities, // tiene que ser un arreglo de id de specialties o un arreglo vacio
  } = req.body;
  if (req.file.path) {
    console.log("req.file ", req.file);
    console.log("req.file.path ", req.file.path);
    result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log("result ", result);
  }
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
          imageProfile: result.url,
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
      await fs.unlink(req.file.path); // Elimina la imagen guardada en api/src/public/uploads
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
  if (id) {
    try {
      const doctor = await Person.findOne({
        include: {
          model: Doctor,
          where: {
            id: id,
          },
          include: {
            model: Speciality,
          },
        },
      });
      if (doctor) {
        let json = {};
        console.log(doctor.dataValues.doctors);
        concat_json(doctor.dataValues, json);
        concat_json(doctor.dataValues.doctors[0].dataValues, json);
        json["specialities"] =
          doctor.dataValues.doctors[0].dataValues.specialities;
        res.json({
          data: json,
          message: `Datos de Dr ${doctor.name} ${doctor.lastname}`,
        });
      }
      res.json({ data: null, message: `No se encontro Doctor con id ${id}` });
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
      message: "No se envio id de Doctor",
    });
  }
};

// FUNCION OBSOLETA ver que no la usen en Front y despues BORRARLA
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
    const { patient } = req.query;
    const patients = await Person.findAll({
      where: {
        rol: "Patient",
        name: patient ? { [Op.like]: `%${patient}%` } : { [Op.like]: "%%" },
      },
      include: {
        model: Patient,
        required: true,
        include: [
          {
            model: Doctor,
            where: {
              id: id,
            },
          },
          {
            model: HealthInsurance,
          },
        ],
      },
    });
    const dni_linked_doctor = patients.map((patient) => patient.dataValues.dni);
    const patients_unlinked = await Person.findAll({
      where: {
        rol: "Patient",
        dni: {
          [Op.not]: dni_linked_doctor,
        },
        name: patient ? { [Op.like]: `%${patient}%` } : { [Op.like]: "%%" },
      },
      include: {
        model: Patient,
        include: {
          model: HealthInsurance,
        },
      },
    });
    let json = {};
    // Se concatena la informacion en un solo json
    data = patients.map((patient) => {
      json = {};
      concat_json(patient.dataValues, json);
      concat_json(patient.dataValues.patients[0].dataValues, json);
      json["healthInsurance"] =
        patient.dataValues.patients[0].dataValues.healthInsurance;
      return json;
    });
    // Se concatena la informacion en un solo json
    unlinked = patients_unlinked.map((patient) => {
      json = {};
      concat_json(patient.dataValues, json);
      concat_json(patient.dataValues.patients[0].dataValues, json);
      json["healthInsurance"] =
        patient.dataValues.patients[0].dataValues.healthInsurance;
      return json;
    });
    res.json({
      data: data,
      unlinked: unlinked,
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

const createAppointment = async (req, res) => {
  const { id } = req.params; // id de doctor
  const { patient } = req.query; // id de paciente
  const { date } = req.body; // fecha de turno
  const payment_status = false;
  try {
    const appointment = await Appointment.create({
      date: date,
      payment_status: payment_status,
    });
    appointment.setPatient(patient);
    appointment.setDoctor(id);
    res.json({
      data: appointment,
      message: "Turno creado satisfactoriamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getAppointment = async (req, res) => {
  const { id } = req.params; // id de doctor
  try {
    const appointments = await Appointment.findAll({
      where: {
        doctorId: id,
      },
      include: [
        {
          model: Patient,
          include: {
            model: Person,
          },
        },
        {
          model: Doctor,
          include: {
            model: Person,
          },
        },
      ],
    });
    res.json({
      data: appointments,
      message: "Turnos pendientes del Doctor",
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
  createAppointment,
  getAppointment,
};

const {
  Person,
  Patient,
  Doctor,
  HealthInsurance,
  Speciality,
  Conversation,
  Allergy,
} = require("../db");
const { Op, literal } = require("sequelize");
const bcryptjs = require("bcryptjs");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
  let result = null;
  const {
    dni,
    name,
    lastname,
    address,
    email,
    password,
    num_member,
    healthInsuranceId,
  } = req.body;
  if (req.file.path) {
    result = await cloudinary.v2.uploader.upload(req.file.path);
  }
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

// http://localhost:3001/patient/id_Paciente
const getPatient = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const patient = await Person.findOne({
        include: {
          model: Patient,
          where: {
            id: id,
          },
          include: {
            model: HealthInsurance,
          },
        },
      });

      let json = {};
      console.log(patient.dataValues.patients);
      concat_json(patient.dataValues, json);
      concat_json(patient.dataValues.patients[0].dataValues, json);
      res.json({ data: json, message: "Paciente de la BD" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
        message: "something goes wrong",
      });
    }
  } else {
    res.status(500).json({ data: null, message: "No se envio id de Paciente" });
  }
};

// VER SI USAN ESTA RUTA SINO ELIMNIARLA
// http://localhost:3001/patient
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
  const { id_Doctor } = req.body; // id de Doctor

  try {
    let patient = await Patient.findOne({
      where: {
        id: id,
      },
    });
    let doctor = await Doctor.findOne({
      where: {
        id: id_Doctor,
      },
    });
    if (!patient || !doctor) {
      return res.status(500).json({
        data: null,
        message: "Id de Paciente o id de Doctor erroneo",
      });
    }
    await patient.addDoctor(doctor);
    const conversation = await Conversation.create();
    await conversation.addPerson([
      patient.dataValues.personDni,
      doctor.dataValues.personDni,
    ]);
    deleteNotification(id); //borra la notificación
    res.json({
      data: patient,
      message: "Doctor añadido a lista de doctores de paciente",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params; // id de Paciente
  const { id_Doctor } = req.query; // id de Doctor

  try {
    let patient = await Patient.findOne({
      where: {
        id: id,
      },
    });
    let doctor = await Doctor.findOne({
      where: {
        id: id_Doctor,
      },
    });
    if (!patient || !doctor) {
      return res.status(500).json({
        data: null,
        message: "Id de Paciente o id de Doctor erroneo",
      });
    }
    await patient.removeDoctor([id_Doctor]);
    res.json({
      data: patient,
      message: "Doctor borrado de la lista de doctores de paciente",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllergies = async (req, res) => {
  let { id } = req.params;
  if (id) {
    try {
      let allergies = await Allergy.findAll({
        where: {
          patientId: id,
        },
      });
      res.json({
        data: allergies,
        message: "Succes!",
      });
    } catch (e) {
      console.log("Error in Data Base: ", e);
    }
  } else {
    res.send("The id is not recognized");
  }
};

const createAllergie = async (req, res) => {
  let { id } = req.params;
  let { name, severity, description } = req.body;
  try {
    let allergie = await Allergy.create({
      name,
      severity,
      description,
    });
    await allergie.setPatient(id);
    res.json({
      data: allergie,
      message: "Alergia creada!",
    });
  } catch (e) {
    console.log("Error in the Data Base: ", e);
  }
};

module.exports = {
  getDoctors,
  getPatient,
  getPatients,
  createPatient,
  addDoctor,
  deleteDoctor,
  getAllergies,
  createAllergie,
};

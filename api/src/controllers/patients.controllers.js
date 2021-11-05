const { Person, Patient, Doctor, Speciality } = require("../db");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const { deleteNotification } = require("./notification");
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

/****************** getPatient ******************
http://localhost:3001/patient/dni_paciente

ej: (method: GET) http://localhost:3001/patient/999

res: {
    "data": {
        "dni": 999,
        "name": "Alex",
        "lastname": "Villanueva",
        "address": "Calle falsa 123",
        "imageProfile": null,
        "email": "alex@hotmail.com",
        "password": "$2b$10$LBvXkX1ihvshYofwbH24JuRVHI5ZP5i6KIpu3ck/uPhuWLZxF4Kci",
        "rol": "Patient",
        "patient": {
            "id": "b6898307-9563-40f5-8a06-0220147d07c6",
            "num_member": 1,
            "personDni": 999,
            "healthInsuranceId": null
        }
    },
    "message": "Paciente de la BD"
}
*/
const getPatient = async (req, res) => {
  let { id } = req.params;
  console.log("DNI:", id);
  id = parseInt(id);
  let person = null;
  try {
    if (id) {
      person = await Person.findOne({
        where: {
          dni: id,
        },
        include: [
          {
            model: Patient,
          },
        ],
      });
      if (!person) {
        return res.json({
          data: person,
          message: `No se econtro Paciente con DNI: ${id}`,
        });
      }
      res.json({ data: person, message: `Paciente con DNI: ${id}` });
    } else {
      res.json({ data: person, message: "No se envio DNI del Paciente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

/******************* getPatients ******************
http://localhost:3001/patient

ej: (method: GET) http://localhost:3001/patient

res: {
    "data": [
        {
            "dni": 999,
            "name": "Alex",
            "lastname": "Villanueva",
            "address": "Calle falsa 123",
            "imageProfile": null,
            "email": "alex@hotmail.com",
            "password": "$2b$10$LBvXkX1ihvshYofwbH24JuRVHI5ZP5i6KIpu3ck/uPhuWLZxF4Kci",
            "rol": "Patient",
            "patient": {
                "id": "b6898307-9563-40f5-8a06-0220147d07c6",
                "num_member": 1,
                "personDni": 999,
                "healthInsuranceId": null
            }
        },
        {
            "dni": 888,
            "name": "Maria",
            "lastname": "Alvarez",
            "address": "Calle falsa 123",
            "imageProfile": null,
            "email": "majo@hotmail.com",
            "password": "$2b$10$UYaI3GZszizunmbMWQeyP.U67h4a4w8ytcFyUM5LjdpSCS3NkZjh6",
            "rol": "Patient",
            "patient": {
                "id": "62fbf62c-64b1-43dc-82ef-26b1e0f2e253",
                "num_member": 1,
                "personDni": 888,
                "healthInsuranceId": null
            }
        }
    ],
    "message": "Todos los Pcientes registrados"
}
*/
const getPatients = async (req, res) => {
  try {
    let patients = await Person.findAll({
      where: {
        rol: "Patient",
      },
      include: {
        model: Patient,
      },
    });
    if (patients.length > 0) {
      return res.json({
        data: patients,
        message: "Todos los Pcientes registrados",
      });
    }
    res.json({ data: patients, message: "No se registran Pacientes" });
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

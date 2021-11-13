const {
  Person,
  Patient,
  Doctor,
  HealthInsurance,
  Speciality,
  Conversation,
  Allergy,
  Disease,
  Appointment,
  Prescription_drug,
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
  let result;
  try {
    if (req.file != undefined) {
      result = await cloudinary.v2.uploader.upload(req.file.path);
      result = result.url;
    }
  } catch (error) {
    console.log("Error con cloudinary:", error);
  }

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
          imageProfile: result,
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
      try {
        if (req.file != undefined) {
          await fs.unlink(req.file.path); // Elimina la imagen guardada en api/src/public/uploads
        }
      } catch (error) {
        console.log("Error eliminando la imagen guardada", error);
      }
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

const getAppointment = async (req, res) => {
  const { id } = req.params; // id de paciente
  try {
    const appointments = await Appointment.findAll({
      where: {
        patientId: id,
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
      message: "Turnos pendientes del Paciente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
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
        message: "Success!",
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
  if (id) {
    if (name && severity && description) {
      try {
        let verif = await Allergy.findOne({
          where: {
            patientId: id,
            name: name,
          },
        });
        if (!verif) {
          try {
            let allergie = await Allergy.create({
              name,
              severity,
              description,
            });
            await allergie.setPatient(id);
            res.json({
              data: allergie,
              message: "ALLery created!",
            });
          } catch (e) {
            console.log("Error in the Data Base: ", e);
          }
        } else {
          res.send("This allergy already exists!");
        }
      } catch (error) {
        console.log("Error en Verif!", error);
      }
    } else {
      res.send("There are empty fields!");
    }
  } else {
    res.send("The id is not recognized!");
  }
};

const createDisease = async (req, res) => {
  let { id } = req.params;
  let { name, diagnosis_date, description } = req.body;
  if (id) {
    if (name && diagnosis_date && description) {
      try {
        let verif = await Disease.findOne({
          where: {
            patientId: id,
            name: name,
          },
        });
        if (!verif) {
          try {
            let disease = await Disease.create({
              name,
              diagnosis_date,
              description,
            });
            await disease.setPatient(id);
            res.json({
              data: disease,
              message: "Diseased created!",
            });
          } catch (error) {
            console.log("Error in the Data Base: ", error);
          }
        } else {
          res.send("This disease already exists!");
        }
      } catch (error) {
        console.log("Error en VERIF!", error);
      }
    } else {
      res.send("There are empty fields!");
    }
  } else {
    res.send("The id is not recognized!");
  }
};

const getDiseases = async (req, res) => {
  let { id } = req.params;
  if (id) {
    try {
      let diseases = await Disease.findAll({
        where: {
          patientId: id,
        },
      });
      res.json({
        data: diseases,
        message: "Success!!!",
      });
    } catch (error) {
      console.log("Error in the Data Base: ", error);
    }
  } else {
    res.send("The id is not recognized");
  }
};

const createPrescription_drug = async (req, res) => {
  let { id } = req.params;
  let { name, posology, description } = req.body;
  if (id) {
    if (name && posology && description) {
      try {
        let verif = await Prescription_drug.findOne({
          where: {
            patientId: id,
            name: name,
          },
        });
        if (!verif) {
          try {
            let prescription_drug = await Prescription_drug.create({
              name,
              posology,
              description,
            });
            await prescription_drug.setPatient(id);
            res.json({
              data: prescription_drug,
              message: "Prescription Drug created!",
            });
          } catch (error) {
            console.log("Error in the Data Base: ", error);
          }
        } else {
          res.send("This prescription drug already exists!");
        }
      } catch (error) {
        console.log("Error en VERIF!", error);
      }
    } else {
      res.send("There are empty fields!");
    }
  } else {
    res.send("The id si not recognized!");
  }
};

const getPrescription_drugs = async (req, res) => {
  let { id } = req.params;
  if (id) {
    try {
      let prescription_drugs = await Prescription_drug.findAll({
        where: {
          patientId: id,
        },
      });
      res.json({
        data: prescription_drugs,
        message: "Success!",
      });
    } catch (error) {
      console.log("Error in the Data Base: ", error);
    }
  } else {
    res.send("The id is not recognized!");
  }
};

const deleteAllergie = async (req, res) => {
  let { idAllergy } = req.query;
  let { idPatient } = req.params;
  if (idAllergy) {
    if (idPatient) {
      try {
        let allergy = await Allergy.findOne({
          where: {
            id: idAllergy,
          },
        });
        let patient = await Patient.findOne({
          where: {
            id: idPatient,
          },
        });
        if (allergy && patient) {
          await Allergy.destroy({
            where: {
              id: idAllergy,
            },
          });
          res.send("Delete succes!");
        } else {
          res.send("Error with the patient id or allergy id");
        }
      } catch (error) {
        console.log("Error in the Data Base: ", error);
      }
    } else {
      res.send("The patient id is not recognized!");
    }
  } else {
    res.send("The allergy id is not recognized!");
  }
};

const deleteDisease = async (req, res) => {
  let { idDisease } = req.query;
  let { idPatient } = req.params;
  if (idDisease) {
    if (idPatient) {
      try {
        let disease = await Disease.findOne({
          where: {
            id: idDisease,
          },
        });
        let patient = await Patient.findOne({
          where: {
            id: idPatient,
          },
        });
        if (disease && patient) {
          await Disease.destroy({
            where: {
              id: idDisease,
            },
          });
          res.send("Delete success!");
        } else {
          res.send("Error with the patient id or the disease id!");
        }
      } catch (error) {
        console.log("Error in the DATA BASE!", error);
      }
    } else {
      res.send("The patient id is not recognized!");
    }
  } else {
    res.send("The disease id is not recognized!");
  }
};

const deletePrescription_drug = async (req, res) => {
  let { idPrescription_drug } = req.query;
  let { idPatient } = req.params;
  if (idPrescription_drug) {
    if (idPatient) {
      try {
        let prescription_drug = await Prescription_drug.findOne({
          where: {
            id: idPrescription_drug,
          },
        });
        let patient = await Patient.findOne({
          where: {
            id: idPatient,
          },
        });
        if (prescription_drug && patient) {
          await Prescription_drug.destroy({
            where: {
              id: idPrescription_drug,
            },
          });
          res.send("Delete success!");
        } else {
          res.send("Error with the patient id or the prescription_drug id");
        }
      } catch (error) {
        console.log("Error in the DATA BASE!", error);
      }
    } else {
      res.send("The patient id is not recognized!");
    }
  } else {
    res.send("The prescription_drug id is not recognized!");
  }
};

const modifAllergy = async (req, res) => {
  let { name, severity, description } = req.body;
  let { id } = req.params;
  if (id) {
    try {
      let allergy = await Allergy.findOne({
        where: {
          id: id,
        },
      });
      if (allergy) {
        allergy.name = name;
        allergy.severity = severity;
        allergy.description = description;
        res.json({
          data: allergy,
          message: "Edit success!",
        });
      } else {
        res.send("The allergy id is not recognized!");
      }
    } catch (error) {
      console.log("Error in the DATA BASE!", error);
    }
  } else {
    res.send("The allergy id cannot by null");
  }
};

const modifDisease = async (req, res) => {
  let { id } = req.params;
  let { name, diagnosis_date, description } = req.body;
  if (id) {
    try {
      let disease = await Disease.findOne({
        where: {
          id: id,
        },
      });
      if (disease) {
        disease.name = name;
        disease.diagnosis_date = diagnosis_date;
        disease.description = description;
        res.json({
          data: disease,
          message: "Edit success!",
        });
      } else {
        res.status(400).send("The disease id is not recognized!");
      }
    } catch (error) {
      console.log("Error in the DATA BASE!", error);
    }
  } else {
    res.status(400).send("The disease id cannot by null");
  }
};

const modifPrescription_drug = async (req, res) => {
  let { id } = req.params;
  let { name, posology, description } = req.body;
  if (id) {
    try {
      let prescription_drug = await Prescription_drug.findOne({
        where: {
          id: id,
        },
      });
      if (prescription_drug) {
        prescription_drug.name = name;
        prescription_drug.posology = posology;
        prescription_drug.description = description;
        res.json({
          data: prescription_drug,
          message: "Edit success!",
        });
      } else {
        res.status(400).send("The prescription_drug id is not recognized!");
      }
    } catch (error) {
      console.log("Error in the DATA BASE!", error);
    }
  } else {
    res.status(400).send("The prescrption_drug id cannot by null");
  }
};

module.exports = {
  getDoctors,
  getPatient,
  getPatients,
  createPatient,
  addDoctor,
  deleteDoctor,
  getAppointment,
  getAllergies,
  createAllergie,
  createDisease,
  getDiseases,
  createPrescription_drug,
  getPrescription_drugs,
  deleteAllergie,
  deleteDisease,
  deletePrescription_drug,
  modifAllergy,
  modifDisease,
  modifPrescription_drug,
};

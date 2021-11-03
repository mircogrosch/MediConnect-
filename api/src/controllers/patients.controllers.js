const { Person, Patient, Doctor, Speciality } = require("../db");
const { Op, INTEGER, NUMBER } = require("sequelize");
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

/******************* getDoctor ******************
http://localhost:3001/patient/doctor?name=Carlos&dni=dni_paciente

ej: (method: GET) http://localhost:3001/patient/doctor?name=Car&dni=999

res: {
    "data": [
        {
            "id": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
            "enrollment": 12,
            "location": "Belgrano 125",
            "personDni": 222,
            "Doctor_Patient": {
                "createdAt": "2021-11-03T16:54:27.878Z",
                "updatedAt": "2021-11-03T16:54:27.878Z",
                "doctorId": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
                "patientId": "b6898307-9563-40f5-8a06-0220147d07c6"
            },
            "person": {
                "dni": 222,
                "name": "Carlos",
                "lastname": "Villa",
                "address": "Calle falsa 123",
                "imageProfile": null,
                "email": "cacho02@hotmail.com",
                "password": "12345",
                "rol": "Doctor"
            },
            "specialities": [
                {
                    "id": "87b65fcf-8951-493a-b246-02f9a35fc968",
                    "name": "ALERGIA",
                    "Doctor_Speciality": {
                        "createdAt": "2021-11-03T16:43:25.167Z",
                        "updatedAt": "2021-11-03T16:43:25.167Z",
                        "doctorId": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
                        "specialityId": "87b65fcf-8951-493a-b246-02f9a35fc968"
                    }
                }
            ]
        }
    ],
    "message": "Lista de Doctores de Alex"
}
*/
const getDoctor = async (req, res) => {
  let { name, dni } = req.query;
  name = name.toString();
  dni = parseInt(dni);
  try {
    const patient = await Person.findOne({
      where: {
        dni: dni,
      },
      include: {
        model: Patient,
        include: {
          model: Doctor,
          include: [
            {
              model: Person,
              where: {
                name: {
                  [Op.like]: `%${name}%`,
                },
              },
            },
            {
              model: Speciality,
            },
          ],
        },
      },
    });
    if (patient) {
      if (patient.patient.doctors.length > 0) {
        return res.json({
          data: patient.patient.doctors,
          message: `Lista de Doctores de ${patient.name}`,
        });
      }
      return res.json({
        data: patient.patient.doctors,
        message: `El Paciente ${patient.name} no tiene a nadie en su lista de Doctores`,
      });
    }
    res.json({
      data: patient,
      message: `Paciente no existe`,
    });
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
      include: {
        model: Doctor,
        include: [
          {
            model: Speciality,
          },
          {
            model: Person,
          },
        ],
      },
    });
    let doctors = await patient.getDoctors();
    let doctors_persons = [];
    for (let i = 0; i < doctors.length; i++) {
      let person = await Person.findOne({
        where: {
          dni: doctors[i].dataValues.personDni,
        },
        include: {
          model: Doctor,
          include: {
            model: Speciality,
          },
        },
      });
      for (let key in person.dataValues) {
        doctors[i].dataValues[key] = person.dataValues[key];
      }
      doctors_persons.push(doctors[i].dataValues);
    }
    res.json({
      data: patient.dataValues.doctors,
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
  await patient.addDoctor([id_Doctor]);
  res.json({
    data: patient,
    message: "Doctor añadido a lista de doctores de paciente",
  });
};

const deleteDoctor = async (req, res) => {
  const { id } = req.params; // id de Paciente
  const { id_Doctor } = req.body; // id de Doctor
  let patient = await Patient.findOne({
    where: {
      id: id,
    },
  });
  await patient.removeDoctor([id_Doctor]);
  res.json({
    data: patient,
    message: "Doctor borrado de la lista de doctores de paciente",
  });
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

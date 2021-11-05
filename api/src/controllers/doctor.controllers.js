const {
  Person,
  Doctor,
  Patient,
  Speciality,
} = require("../db");
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
    imageProfile,
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

/******************* getDoctor ******************
 * http://localhost:3001/doctor/dni_Doctor
 * 
 * ej: http://localhost:3001/doctor/222
 * 
 * res: {
    "data": {
        "dni": 222,
        "name": "Carlos",
        "lastname": "Villa",
        "address": "Calle falsa 123",
        "imageProfile": null,
        "email": "cacho02@hotmail.com",
        "password": "12345",
        "rol": "Doctor",
        "doctor": {
            "id": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
            "enrollment": 12,
            "location": "Belgrano 125",
            "personDni": 222,
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
    },
    "message": "Doctor registrado con DNI: 222"
}
 * 
*/
const getDoctor = async (req, res) => {
  let { id } = req.params;
  let doctor = null;
  try {
    if (typeof id !== "undefined") {
      id = parseInt(id);
      doctor = await Person.findOne({
        where: {
          dni: id,
          rol: "Doctor",
        },
        include: {
          model: Doctor,
          include: {
            model: Speciality,
          },
        },
      });
    }
    if (!doctor) {
      return res.json({
        data: doctor,
        message: `No se encontro Doctor registrado con DNI: ${id}`,
      });
    }
    res.json({ data: doctor, message: `Doctor registrado con DNI: ${id}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

/******************* getPatient ******************
http://localhost:3001/doctor/patient?name=Name_Paciente&dni=DNI_Doctor

ej: http://localhost:3001/doctor/patient?name=Ale&dni=222

res:  {
    "data": [
        {
            "id": "b6898307-9563-40f5-8a06-0220147d07c6",
            "num_member": 1,
            "personDni": 999,
            "healthInsuranceId": null,
            "Doctor_Patient": {
                "createdAt": "2021-11-03T16:54:27.878Z",
                "updatedAt": "2021-11-03T16:54:27.878Z",
                "doctorId": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
                "patientId": "b6898307-9563-40f5-8a06-0220147d07c6"
            },
            "person": {
                "dni": 999,
                "name": "Alex",
                "lastname": "Villanueva",
                "address": "Calle falsa 123",
                "imageProfile": null,
                "email": "alex@hotmail.com",
                "password": "$2b$10$LBvXkX1ihvshYofwbH24JuRVHI5ZP5i6KIpu3ck/uPhuWLZxF4Kci",
                "rol": "Patient"
            }
        }
    ],
    "message": "Lista de Pacientes de Carlos"
}

*/
const getPatient = async (req, res) => {
  let { name, dni } = req.query;
  name = name.toString();
  dni = parseInt(dni);
  try {
    const doctor = await Person.findOne({
      where: {
        dni: dni,
        rol: "Doctor",
      },
      include: {
        model: Doctor,
        include: {
          model: Patient,
          include: {
            model: Person,
            where: {
              name: {
                [Op.like]: `%${name}%`,
              },
            },
            attributes: { exclude: ["Doctor_Patient"] },
          },
        },
      },
    });
    if (doctor) {
      if (doctor.doctor.patients.length > 0) {
        return res.json({
          data: doctor.doctor.patients,
          message: `Lista de Pacientes de ${doctor.name}`,
        });
      }
      return res.json({
        data: doctor.doctor.patients,
        message: `El Doctor ${doctor.name} no tiene a nadie en su lista de Pacientes`,
      });
    }
    res.json({
      data: doctor,
      message: `Doctor no existe`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

/******************* getPatients ******************
http://localhost:3001/doctor/patients/DNI_Doctor

ej: http://localhost:3001/doctor/patients/222

res: {
    "data": [
        {
            "id": "b6898307-9563-40f5-8a06-0220147d07c6",
            "num_member": 1,
            "personDni": 999,
            "healthInsuranceId": null,
            "person": {
                "dni": 999,
                "name": "Alex",
                "lastname": "Villanueva",
                "address": "Calle falsa 123",
                "imageProfile": null,
                "email": "alex@hotmail.com",
                "password": "$2b$10$LBvXkX1ihvshYofwbH24JuRVHI5ZP5i6KIpu3ck/uPhuWLZxF4Kci",
                "rol": "Patient"
            },
            "Doctor_Patient": {
                "createdAt": "2021-11-03T16:54:27.878Z",
                "updatedAt": "2021-11-03T16:54:27.878Z",
                "doctorId": "cea5f0e4-a818-4a53-b842-4f5b5e3301c0",
                "patientId": "b6898307-9563-40f5-8a06-0220147d07c6"
            }
        }
    ],
    "message": "Lista de Pacientes de Carlos"
}
*/
const getPatients = async (req, res) => {
  let { dni } = req.params;
  dni = parseInt(dni);
  try {
    const doctor = await Person.findOne({
      where: {
        dni: dni,
        rol: "Doctor",
      },
      include: {
        model: Doctor,
        include: {
          model: Patient,
          include: {
            model: Person,
          },
          attributes: { exclude: "Doctor_Patient" },
        },
      },
    });
    if (doctor) {
      if (doctor.doctor.patients.length > 0) {
        return res.json({
          data: doctor.doctor.patients,
          message: `Lista de Pacientes de ${doctor.name}`,
        });
      }
      return res.json({
        data: doctor.doctor.patients,
        message: `El Doctor ${doctor.name} no tiene a nadie en su lista de Pacientes`,
      });
    }
    res.json({
      data: doctor,
      message: `Doctor no existe`,
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

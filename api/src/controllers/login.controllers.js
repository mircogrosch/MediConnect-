const { Person, Patient, Doctor } = require("../db");
const bcrypt = require("bcrypt");

//Para poder comparar con la password encrypt adasd
function comparePassword(password, passwordDB) {
  return bcrypt.compareSync(password, passwordDB);
}

async function getLogin(req, res) {
  let { email, password, remember } = req.body;
  try {
    let person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (person !== null) {
      //Si existe persona con ese email

      if (comparePassword(password, person.password)) {
        //Si coincide password ingresada con la registrada del usuario
        //Para traer el perfil de DOCTOR
        if (person.rol === "Doctor") {
          try {
            let doctor = await Doctor.findOne({
              where: {
                personDni: person.dni,
              },
            });
            person = { ...person, doctor };
            person = {
              person: person.dataValues,
              doctor: person.doctor,
            };
          } catch (e) {
            console.log("Error al traer al doctor: ", e);
          }
          //Para traer el perfil de PACIENTE
        } else if (person.rol === "Patient") {
          try {
            let patient = await Patient.findOne({
              where: {
                personDni: person.dni,
              },
            });
            person = { ...person, patient };
            person = {
              person: person.dataValues,
              patient: person.patient,
            };
          } catch (e) {
            console.log("Error al traer al paciente: ", e);
          }
        }
        res.status(200).send({
          data: person,
          message: "Logged user",
        });
      } else {
        //Se encontro persona, pero password es incorrecta
        res.status(200).send({ message: "Incorrect password" });
      }
    } else {
      //No se encontro persona con email ingresado
      res.status(200).send({ message: "There is no such registered email" });
    }
  } catch (e) {
    res.status(400).send("Error desde base de datos: ", e);
  }
}

module.exports = {
  getLogin,
};

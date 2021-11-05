const { Router } = require("express");
const router = Router();
const {
  getPatient,
  getPatients,
  createPatient,
  getDoctors,
  addDoctor,
  deleteDoctor,
} = require("../controllers/patients.controllers");

router.route("/").get(getPatients);

router.route("/").post(createPatient);

/*
Para traer todos los Doctores de un Paciente
Para traer todos los Doctores que no estan relacionados a un Paciente
Especificaciones:
  Se envia el id del Paciente por params 
    ej: localhost:3001/patient/doctors/id_paciente
    res: { 
      data: doctores_relacionados, 
      unlinked: doctores_no_relacionados,
    }
  Se puede filtrar por Nombre de Doctor mediante querys
    ej: localhost:3001/patient/doctors/id_paciente?doctor=Victor
    res: { 
      data: doctores_relacionados, 
      unlinked: doctores_no_relacionados,
    }
*/
router.route("/doctors/:id").get(getDoctors);

/*
Para agregar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por body el id del Doctor body -> id_Doctor
ej: localhost:3001/patient/doctors/id_paciente
*/
router.route("/doctors/:id").post(addDoctor);
/*
Para eliminar un Doctor a lista de Doctores de un Paciente
Se envia por params el id del Paciente
Y se envia por body el id del Doctor
*/
router.route("/doctors/:id").delete(deleteDoctor);

router.route("/:id").get(getPatient);

module.exports = router;

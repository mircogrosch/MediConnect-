const { Router } = require("express");
const router = Router();
const {
  createDoctor,
  getDoctor,
  getDoctors,
  getPatient,
  getPatients,
  createAppointment,
  getAppointment,
} = require("../controllers/doctor.controllers");

router.route("/").get(getDoctors);

router.route("/").post(createDoctor);

/* +++++++++++++++ NO USAR ESTA FUNCION +++++++++++++++++ */
router.route("/patient").get(getPatient);

/*
 +++++++++++++ INFORMACION DE RUTA +++++++++++++++++++++++++
Para traer todos los Pacientes de un Doctor
Para traer todos los Pacientes que no estan relacionados a un Doctor
Especificaciones:
  Se envia el id del Paciente por params 
    ej: localhost:3001/doctor/patients/id_doctor
    res: { 
      data: Pacientes_relacionados, 
      unlinked: Pacientes_no_relacionados,
    }
  Se puede filtrar por Nombre de Paciente mediante querys
    ej: localhost:3001/doctor/patients/id_doctor?patient=Victor
    res: { 
      data: Pacientes_relacionados, 
      unlinked: Pacientes_no_relacionados,
    }
*/
router.route("/patients/:id").get(getPatients);

/*
  Devuelve todos los turnos pendientes de un Doctor
  fecha - hora - estado de pago - datos paciente
  Se envia id_doctor por params
  ej:  localhost:3001/doctor/appointment/id_doctor
*/
router.route("/appointment/:id").get(getAppointment);

/*
  RUTA DESDE PACIENTE
  Crea un TURNO
  fecha - hora - estado de pago - datos paciente
  Se envia id_doctor por params
  ej:  localhost:3001/doctor/appointment/id_doctor?patient=Id_patient
*/
router.route("/appointment/:id").post(createAppointment);


router.route("/:id").get(getDoctor);

module.exports = router;

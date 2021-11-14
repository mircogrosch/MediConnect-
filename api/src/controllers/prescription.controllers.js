const { Prescription, Doctor, Patient, Person } = require("../db");

const createPrescription = async (req, res) => {
  const { patientId, doctorId } = req.query;
  const { medication, amount, frequency, how_much, date } = req.body;
  try {
    const newPrescription = await Prescription.create({
      medication: medication,
      amount: amount,
      frequency: frequency,
      how_much: how_much,
      date: new Date(date),
    });
    await newPrescription.setDoctor(doctorId);
    await newPrescription.setPatient(patientId);
    res.json({
      data: newPrescription,
      message: "Receta creada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

const getPrescriptions = async (req, res) => {
  const { patientId, doctorId } = req.query;
  try {
    const prescriptions = await Prescription.findAll({
      where: {
        patientId: patientId,
        doctorId: doctorId,
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
      data: prescriptions,
      message: "Recetas emitidas del doctor al paciente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

module.exports = { createPrescription, getPrescriptions };

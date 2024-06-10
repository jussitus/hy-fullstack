import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";
const router = express.Router();

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.get("/", (_req, res) => {
  try {
    res.send(patientService.getNonSensitivePatients());
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Some error happened.";
    if (error instanceof Error) {
      errorMessage = " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;

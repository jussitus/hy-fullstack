import patients from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map((patient) => {
    const { entries, ssn, ...nonSensitivePatient } = patient;
    return nonSensitivePatient;
  });
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient) {
    return patient;
  } else {
    throw new Error("patient not found");
  }
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, addPatient, getPatient };

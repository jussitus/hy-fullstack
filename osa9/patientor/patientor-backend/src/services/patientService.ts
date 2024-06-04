import patients from "../../data/patients";
import toNewPatient from "../utils";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";
const getNonSensitivePatients = (): NonSensitivePatient[] => {
  const processedPatients = patients.map((patient) => {
    const object = toNewPatient(patient) as Patient;
    object.id = patient.id;
    return object;
  });

  return processedPatients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = { ...patient, id: uuid() };
  patients.push(newPatient);
  return newPatient;
};

export default { getNonSensitivePatients, addPatient };

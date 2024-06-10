import { useParams } from 'react-router-dom'
import { Patient } from '../types'
import { useEffect, useState } from 'react'
import patientService from '../services/patients'
import EntryList from './EntryList'

const PatientPage = () => {
  const id = useParams().id
  const [patient, setPatient] = useState<Patient | null>(null)
  useEffect(() => {
    const getPatient = async (patientId: string) => {
      const patient = await patientService.getById(patientId)
      setPatient(patient)
    }
    if (id) {
      getPatient(id)
    }
  }, [])
  if (!patient) return <div>Patient not found.</div>
  return (
    <div>
      <h1>{patient.name}</h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <EntryList entries={patient.entries} />
    </div>
  )
}

export default PatientPage

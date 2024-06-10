import { Diagnosis } from '../../types'
import diagnosisService from '../../services/diagnoses'
import { useEffect, useState } from 'react'
interface PatientDiagnosesProps {
  diagnosisCodes: Array<Diagnosis['code']>
}

const PatientDiagnoses = (props: PatientDiagnosesProps) => {
  const [patientDiagnoses, setPatientDiagnoses] = useState<Diagnosis[]>([])
  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => {
      setPatientDiagnoses(
        diagnoses.filter((diagnosis) =>
          props.diagnosisCodes.includes(diagnosis.code)
        )
      )
    })
  }, [])
  return (
    <ul>
      {patientDiagnoses.map((diagnosis) => (
        <li key={diagnosis.code}>
          {diagnosis.code}: {diagnosis.name}
        </li>
      ))}
    </ul>
  )
}

export default PatientDiagnoses

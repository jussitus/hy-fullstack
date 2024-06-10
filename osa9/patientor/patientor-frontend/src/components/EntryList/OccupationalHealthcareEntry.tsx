import { EntryProps } from '.'
import WorkIcon from '@mui/icons-material/Work'
import PatientDiagnoses from './PatientDiagnoses'
import { useState } from 'react'
const OccupationalHealthcareEntry = (props: EntryProps) => {
  if (props.entry.type !== 'OccupationalHealthcare') {
    return null
  }

  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (!expanded) {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <WorkIcon /> {props.entry.employerName}
        <br />
        {props.entry.description}
      </div>
    )
  } else {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <WorkIcon /> {props.entry.employerName}
        <br />
        {props.entry.description}
        <br />
        Seen by: {props.entry.specialist}
        <br />
        {props.entry.sickLeave && (
          <>
            Sick leave from {props.entry.sickLeave.startDate} to{' '}
            {props.entry.sickLeave.endDate}
          </>
        )}
        {props.entry.diagnosisCodes && (
          <PatientDiagnoses diagnosisCodes={props.entry.diagnosisCodes} />
        )}
      </div>
    )
  }
}

export default OccupationalHealthcareEntry

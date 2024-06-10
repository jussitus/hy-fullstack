import { EntryProps } from '.'
import HotelIcon from '@mui/icons-material/Hotel'
import PatientDiagnoses from './PatientDiagnoses'
import { useState } from 'react'
const HospitalEntry = (props: EntryProps) => {
  if (props.entry.type !== 'Hospital') {
    return null
  }

  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (!expanded) {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <HotelIcon />
        <br />
        {props.entry.description}
      </div>
    )
  } else {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <HotelIcon />
        <br />
        {props.entry.description}
        <br />
        Seen by: {props.entry.specialist}
        <br />
        Discharged {props.entry.discharge.date}, reason{': '}"
        {props.entry.discharge.criteria}"
        {props.entry.diagnosisCodes && (
          <PatientDiagnoses diagnosisCodes={props.entry.diagnosisCodes} />
        )}
      </div>
    )
  }
}

export default HospitalEntry

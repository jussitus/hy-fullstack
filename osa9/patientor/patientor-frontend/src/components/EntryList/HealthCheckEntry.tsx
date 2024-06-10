import { useState } from 'react'
import { EntryProps } from '.'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import PatientDiagnoses from './PatientDiagnoses'
const HealthCheckRating = (rating: number) => {
  const style = { backgroundColor: 'black', margin: '1em' }
  switch (rating) {
    case 0:
      return <span style={{ color: 'green', ...style }}>GOOD</span>
    case 1:
      return <span style={{ color: 'yellow', ...style }}>OK</span>
    case 2:
      return <span style={{ color: 'red', ...style }}>BAD</span>
    case 3:
      return <span style={{ color: 'red', ...style }}>CRITICAL CONDITION</span>
    default:
      return <div>Error?</div>
  }
}

const HealthCheckEntry = (props: EntryProps) => {
  if (props.entry.type !== 'HealthCheck') {
    return null
  }

  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (!expanded) {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <LocalHospitalOutlinedIcon />
        <br />
        {props.entry.description}
        {HealthCheckRating(props.entry.healthCheckRating)}
      </div>
    )
  } else {
    return (
      <div onClick={toggleExpanded}>
        {props.entry.date} <LocalHospitalOutlinedIcon />
        <br />
        {props.entry.description}
        {HealthCheckRating(props.entry.healthCheckRating)}
        <br />
        Seen by: {props.entry.specialist}
        {props.entry.diagnosisCodes && (
          <PatientDiagnoses diagnosisCodes={props.entry.diagnosisCodes} />
        )}
      </div>
    )
  }
}

export default HealthCheckEntry

import { Entry } from '../../types'
import HealthCheckEntry from './HealthCheckEntry'
import HospitalEntry from './HospitalEntry'
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry'

interface EntryListProps {
  entries: Entry[]
}

export interface EntryProps {
  entry: Entry
}

const entryStyle = { border: 'dotted', padding: '1em' }

const entryType = (entry: Entry) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />
    case 'Hospital':
      return <HospitalEntry entry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />
    default:
      const _exhaustive: never = entry
      return _exhaustive
  }
}

const EntryList = (props: EntryListProps) => {
  return (
    <div>
      <h2>Entries</h2>
      {props.entries.map((entry) => (
        <div key={entry.id} style={entryStyle}>
          {entryType(entry)}
        </div>
      ))}
    </div>
  )
}

export default EntryList

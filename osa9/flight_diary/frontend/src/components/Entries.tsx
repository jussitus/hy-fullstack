import { DiaryEntry } from '../../../backend/src/types'
import Entry from './Entry'

interface EntriesProps {
  diaryEntries: DiaryEntry[]
}

const Entries = (props: EntriesProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.diaryEntries.map((entry) => (
        <Entry key={entry.id} diaryEntry={entry} />
      ))}
    </div>
  )
}

export default Entries

import { DiaryEntry } from '../../../backend/src/types'
interface EntryProps {
  diaryEntry: DiaryEntry
}

const Entry = (props: EntryProps) => {
  return (
    <div>
      <h3>{props.diaryEntry.date}</h3>
      visibility: {props.diaryEntry.visibility}
      <br />
      weather: {props.diaryEntry.weather}
    </div>
  )
}

export default Entry

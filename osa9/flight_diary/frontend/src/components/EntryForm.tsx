import { Dispatch, SetStateAction, useState } from 'react'
import { DiaryEntry, Visibility, Weather } from '../../../backend/src/types'
import entryService from '../services/entries'
import axios from 'axios'

interface EntryFormProps {
  entries: DiaryEntry[]
  setEntries: Dispatch<SetStateAction<DiaryEntry[]>>
}
const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('great')
  const [weather, setWeather] = useState('sunny')
  const [comment, setComment] = useState('')
  const visibilityList = Object.values(Visibility)
  const weatherList = Object.values(Weather)

  const submitEntry = async (event: React.FormEvent) => {
    event.preventDefault()
    const newEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    }
    try {
      const entry = await entryService.postEntry(newEntry)
      props.setEntries(props.entries.concat(entry))
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log(e.response?.data)
        alert(e.response?.data)
      } else {
        console.log(e)
      }
    }
    setDate(''), setVisibility(''), setWeather(''), setComment('')
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submitEntry}>
        <label>date</label>
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <label>visibility</label>
        {visibilityList.map((visibility) => (
          <label key={visibility} style={{ paddingLeft: '0.5em' }}>
            {visibility}
            <input
              type="radio"
              value={visibility}
              name="visibility"
              onChange={({ target }) => setVisibility(target.value)}
            />
          </label>
        ))}
        <br />
        <label>weather</label>
        {weatherList.map((weather) => (
          <label key={weather} style={{ paddingLeft: '0.5em' }}>
            {weather}
            <input
              type="radio"
              value={weather}
              name="weather"
              onChange={({ target }) => setWeather(target.value)}
            />
          </label>
        ))}
        <br />
        <label>comment</label>
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  )
}

export default EntryForm

import { useEffect, useState } from 'react'
import { DiaryEntry } from '../../backend/src/types'
import entryService from './services/entries'
import Entries from './components/Entries'
import EntryForm from './components/EntryForm'

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    entryService.getAll().then((entries) => setEntries(entries))
  }, [])

  return (
    <div>
      <EntryForm entries={entries} setEntries={setEntries} />
      <Entries diaryEntries={entries} />
    </div>
  )
}

export default App

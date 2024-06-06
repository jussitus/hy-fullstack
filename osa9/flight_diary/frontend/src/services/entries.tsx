import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../../../backend/src/types'
const baseUrl = '/api/diaries'

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

const postEntry = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry)
  return response.data
}

export default { getAll, postEntry }

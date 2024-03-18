import { useState, useEffect } from 'react'
import countryService from './services/countries'
import {Countries, Filter} from './components/Countries'
function App() {
  const [data, setData] = useState([])
  const [searchword, setSearchword] = useState('')
  const handleSearchwordChange = (event) => {
    setSearchword(event.target.value)
  }
  useEffect(() => {
    countryService.getAllCountries().then(x => setData(x))
  }
    , [])

  return (
    <>
    hey
    <div><Filter handleSearchwordChange={handleSearchwordChange}/></div>
    <div><Countries data={data} searchword={searchword}/></div>
    </>
  )
}

export default App

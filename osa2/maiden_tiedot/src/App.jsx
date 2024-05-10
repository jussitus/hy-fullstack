import { useState, useEffect } from 'react'
import countryService from './services/countries'
import {Countries, Filter} from './components/Countries'
function App() {
  const [data, setData] = useState([])
  const [searchword, setSearchword] = useState('')
  const handleSearchwordChange = (event) => {
    setSearchword(event.target.value)
  }
  const handleCountryClick = (event) => {
    setSearchword
  }
  useEffect(() => {
    countryService.getAllCountries().then(x => setData(x))
  }
    , [])

  return (
    <>
    <div><Filter handleSearchwordChange={handleSearchwordChange}/></div>
    <div><Countries data={data} searchword={searchword} setSearchword={setSearchword}/></div>
    </>
  )
}

export default App

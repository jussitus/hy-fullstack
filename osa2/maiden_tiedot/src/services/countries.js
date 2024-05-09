import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api' 
// 'http://localhost:3001' 
//'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default {getCountry, getAllCountries}
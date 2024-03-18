import axios from 'axios'
const baseUrl = 'http://localhost:3001' 
//'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/countries`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export default {getCountry, getAllCountries}
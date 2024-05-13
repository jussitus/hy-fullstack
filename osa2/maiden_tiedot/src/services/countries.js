import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='


const getAllCountries = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

export const getWeatherByCity = (city) => {
    const api_key = import.meta.env.VITE_OPENWEATHERMAP_API_KEY
    const request = axios.get(`${weatherUrl}${city}&appid=${api_key}`)
    return request.then(response => response.data)
}

export default {getCountry, getAllCountries}
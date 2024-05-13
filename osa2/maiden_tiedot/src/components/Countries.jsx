import { getWeatherByCity } from "../services/countries"
import { useState, useEffect } from 'react'
export const Countries = ({ data, searchword, setSearchword }) => {
    let filtered = data.filter(e => e.name.common.toLowerCase().includes(searchword.toLowerCase()))
    if (filtered.length > 1) {
        return (
            <><CountryList countries={filtered} setSearchword={setSearchword} /></>
        )
    }
    if (filtered.length === 1) {
        return (
            <><Country country={filtered[0]} /></>
        )
    }
    return (
        <>no countries found</>
    )
}

export const Filter = ({ handleSearchwordChange }) => {
    return (
        <>find countries <input onChange={handleSearchwordChange} /></>
    )
}

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])
    useEffect(() => {
        getWeatherByCity(country.capital[0]).then(x => setWeather(x))
    }, [])
    return (
        <>
            <div style={{ fontSize: 25 }}>{country.name.common}</div>
            <ul>
                <li>Capital: {country.capital[0]}</li>
                <li>Area: {country.area}</li>
                <li>Languages: {Object.values(country.languages).join(", ")}</li>
            </ul>
            <img src={country.flags.png} />
            <div style={{ fontSize: 25 }}>Weather in {country.capital[0]}:</div>
            <ul>
                <li>temperature {(weather.main?.temp - 273.15).toPrecision(3)} °C </li>
                <li>wind {weather.wind?.speed} m/s</li>
                {weather.weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>}
            </ul>
        </>
    )
}

const CountryList = ({ countries, setSearchword }) => {
    return (
        <ul>{countries.map(country => <li>{country.name.common} <button onClick={() => setSearchword(country.name.common)}>show</button></li>)}</ul>
    )
}

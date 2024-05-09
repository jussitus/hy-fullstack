export const Countries = ({ data, searchword }) => {
    let filtered = data.filter(e => e.name.common.toLowerCase().includes(searchword.toLowerCase()))
    if (filtered.length > 1) {
        return (
            <><CountryList countries={filtered} /></>
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
    //console.log(handleSearchwordChange)
    return (
        <>find countries <input onChange={handleSearchwordChange} /></>
    )
}

const Country = ({ country }) => {
    return (
        <>
            <ul>
                <li style={{ fontSize: 25, listStyle:"none" }}>{country.name.common}</li>
                <li>Capital: {country.capital[0]}</li>
                <li>Area: {country.area}</li>
                <li>Languages: {Object.values(country.languages).join(", ")}</li>
            </ul>
            <img src={country.flags.png} />
        </>
    )
}

const CountryList = ({ countries }) => {
    return (
        <ul>{countries.map(country => <li>{country.name.common}</li>)}</ul>
    )
}

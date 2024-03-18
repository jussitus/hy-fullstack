export const Countries = ({data, searchword}) => {
    let filtered = data.filter(e => e.name.common.toLowerCase().includes(searchword.toLowerCase()))
    if (filtered.length > 1) {
        return (
            <><CountryList countries={filtered}/></>
        )
    }
    if (filtered.length === 1) {
        return (
            <><Country country={filtered[0]}/></>
        )
    }
    return (
        <>no countries found</>
    )
}

export const Filter = ({handleSearchwordChange}) => {
    //console.log(handleSearchwordChange)
    return (
        <>find countries <input onChange={handleSearchwordChange} /></>
    )
}

const Country = ({country}) => {
    return (
    <ul>
        <li>NAME: {country.name.common}</li>
        <li>CAPITAL: {country.capital[0]}</li>
    </ul>
    )
}

const CountryList = ({countries}) => {
    return (
        <ul>{countries.map(country => <li>{country.name.common}</li>)}</ul>
    )
}

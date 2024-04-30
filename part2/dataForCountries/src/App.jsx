import { useState, useEffect } from 'react'
import countryService from './services/country'

function Countries({ countries }) {
  if (countries.length > 10) return <div>Too many matches, specify another filter</div>

  if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <div>
          <h3>Languages:</h3>
          <ul>
            {Object.entries(country.languages).map(lang => <li key={lang[0]}>{lang[1]}</li>)}
          </ul>
        </div>
        <img src={country.flags.png} alt={`${country.flag.alt} flag`} />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.cca2}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')

  const filteredCountries = countryInput
    ? countries.filter(country => country.name.common.toLowerCase().includes(countryInput.toLowerCase()))
    : countries

  useEffect(() => {
    countryService
      .getCountries()
      .then(initialCountries => setCountries(initialCountries))
  }, [])

  return (
    <>
      Find countries <input type="text" value={countryInput} onChange={e => setCountryInput(e.target.value)} />
      <Countries countries={filteredCountries} />
    </>
  )
}

export default App

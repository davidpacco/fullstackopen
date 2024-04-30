import { useState, useEffect } from 'react'
import { Countries } from './components/Countries'
import countryService from './services/country'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')

  useEffect(() => {
    if (countryInput) {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(countryInput.toLowerCase())))
    } else {
      setFilteredCountries([])
    }
  }, [countryInput])

  useEffect(() => {
    countryService
      .getCountries()
      .then(initialCountries => setCountries(initialCountries))
  }, [])

  return (
    <>
      Find countries <input type="text" value={countryInput} onChange={e => setCountryInput(e.target.value)} />
      <Countries countries={filteredCountries} setFilteredCountries={setFilteredCountries} />
    </>
  )
}

export default App

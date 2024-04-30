import { useState, useEffect } from 'react'
import { Countries } from './components/Countries'
import countryService from './services/country'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [countryInput, setCountryInput] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const [lat, lon] = filteredCountries[0].latlng
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
        .then(res => setWeather(res.data))
    }
    else {
      setWeather(null)
    }
  }, [filteredCountries])

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
      <Countries countries={filteredCountries} weather={weather} setFilteredCountries={setFilteredCountries} />
    </>
  )
}

export default App

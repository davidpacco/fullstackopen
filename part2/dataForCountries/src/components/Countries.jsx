export function Countries({ countries, weather, setFilteredCountries }) {
  if (countries.length === 0) return null

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
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>Temperature {weather?.main.temp} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />
          <p>Wind {weather?.wind.speed} m/s</p>
        </div>
      </div>
    )
  }

  const showCountryData = (id) => {
    setFilteredCountries(countries.filter(country => country.cca2 === id))
  }

  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.cca2}>{country.name.common}
            <button onClick={() => showCountryData(country.cca2)}>Show</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
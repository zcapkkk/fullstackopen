import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'


const Button = ( { country_name, onclickfunc }) => {
  // You have to force onClick to return a function
  // Errors can come from function running upon render
  // Parenthesis after a function executes the function
  // https://upmostly.com/tutorials/react-onclick-event-handling-with-examples
    return(
      <button onClick={()=>onclickfunc(country_name)} >Show</button>
  )
}

const FilteredCountry = ({ name, onclickfunc  }) => {
  if (name==="Too many matches, specify another filter"){
    return(
       <p> {name} </p>
    )
  }
  else {
    return(
      <p> {name} <Button country_name={name} onclickfunc={onclickfunc} /> </p>
   )}
}

const CountryProfile = ({ country, weather }) => { 
  const add_info = weather.weather
  const icon_str = add_info?add_info[0].icon:'02d'
  const weather_str = `https://openweathermap.org/img/wn/${icon_str}@2x.png`
  if (country !== null && Object.entries(weather).length !== 0) {
  return(
      <div>
        <h2>{country.name.official}</h2>
          <p> Capital: {country.capital} </p>
          <p> Area: {country.area} </p>
          <h3>Languages</h3>
            <ul>
              {Object.entries(country.languages).map((language,index) => <li key={index}><b>{language[0]}</b>: {language[1]} </li>)}
            </ul>
          <img src={ country.flags.png } alt="flag"/>
          <h2> Weather in {country.capital} </h2>
          <p>Temperature: {weather.main.temp}  Celcius</p>
        <img src={weather_str} alt="icon"/>
          <p>Wind: {weather.wind.speed}  m/s</p>
      </div> 
    )
  }
  else if (Object.entries(weather).length !== 0) {
    return(
  <div>
          <h2>{country.name.official}</h2>
          <p> Capital: {country.capital} </p>
          <p> Area: {country.area} </p>
          <h3>Languages</h3>
            <ul>
              {Object.entries(country.languages).map((language,index) => <li key={index}><b>{language[0]}</b>: {language[1]} </li>)}
            </ul>
          <img src={ country.flags.png } alt="flag"/>
    <p>No weather information available</p>
  </div>
    )}  
  else {
    return(<div></div>)
  }
  }


const App = () => {
  
  const api_key = process.env.REACT_APP_API_KEY
  const [country, newCountry] = useState('')
  const [fullCountryList, newFullCountryList] = useState([])
  const [countrylist, newCountryList] = useState([])
  const [countryprofile, newCountryProfile] = useState(null)
  const [listShow, toggleListShow] = useState(true)
  const [weather, newWeather] = useState({})
  
  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        newFullCountryList(response.data)
      })
  }

  useEffect(hook, [])
  
  const weather_hook = (countryprofile, api_key)=>{
    if (countryprofile !== null) {
      const [lat, lng] = countryprofile.capitalInfo.latlng
      axios.get(` https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
      .then(response =>{
        console.log(response.data)
        newWeather(response.data)
      })
    }
  }

  useEffect(()=>weather_hook(countryprofile, api_key), [countryprofile,api_key])

  const filter_logic = (country_list) => {
    if (country_list.length > 10) {
      console.log("Too many countries")
      newCountryList(["Too many matches, specify another filter"])
      toggleListShow(true)
    }
    else if (country_list.length > 1) {
      console.log("ok output list")
      newCountryList(country_list)
      toggleListShow(true)
    }
    else if (country_list.length === 1) {
      console.log("Just right")
      const country_data = fullCountryList.find(element => element.name.common === country_list[0])
      newCountryProfile(country_data)
      toggleListShow(false)
    }
    else {
      console.log("No countries matched")
      toggleListShow(false)
    }
  }
  
  const country_name_list = fullCountryList.map(country => country.name.common)
  const handleChange = (event) => {
    newCountry(event.target.value)
    const filter = event.target.value.toLowerCase()
    const filtered_list = country_name_list.filter(country=> country.toLowerCase().match(filter)!=null)
    console.log(filtered_list)
    filter_logic(filtered_list)
  }

  const handleCountry = (name) => {
    const country_data = fullCountryList.find(element => element.name.common === name)
    newCountryProfile(country_data)
  }

  const selectCountryProfile = (name) => {
    handleCountry(name)
    toggleListShow(false)
  }

  



  // I know using index as unique key is bad practice but I just want to get rid of error
    return (
      <div>
        find countries: 
        <input onChange={handleChange} value={country}/>
        {listShow?
        countrylist.map((country, index) => <FilteredCountry key={index} name={country} handleCountry={handleCountry} onclickfunc={selectCountryProfile}  />)
        :<CountryProfile country={countryprofile} weather={weather}/>}
      </div>
    );
  }

export default App;

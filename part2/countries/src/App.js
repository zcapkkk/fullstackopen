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

const CountryProfile = ({ country }) => {
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
      </div> 
    )
  }

const Weather = ({ country }) => {
  return(
    <div>
      <h2> Weather in {country} </h2>
      <p>Temperature: x Celcius</p>
      <p>icon</p>
      <p>Wind: x m/s</p>
    </div> 
  )
}



const App = () => {
  
  const [country, newCountry] = useState('')
  const [fullCountryList, newFullCountryList] = useState([])
  const [countrylist, newCountryList] = useState([])
  const [countryprofile, newCountryProfile] = useState(null)
  const [listShow, toggleListShow] = useState(true)
  
  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        newFullCountryList(response.data)
      })
  }

  useEffect(hook, [])

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
      newCountryProfile(null)
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
        :<div> <CountryProfile country={countryprofile}/><Weather country={country}/> </div>}
      </div>
    );
  }

export default App;

import { useState, useEffect } from 'react'
import personService from './services/persons'

const Numbers = ({ person, deleteFunc }) =>  <p>{person.name} {person.number} <button onClick={()=>deleteFunc(person)}>delete</button></p>

const Filter = ({ filterchange, filtervalue }) => {
  // some logic
  return(
    <div>
        filter shown with:
        <input onChange={filterchange} value={filtervalue} />
    </div>
  )
}

const Persons = ({ submit, name, number, namechange, numberchange }) => {
  return(
  <div>
      <form onSubmit={submit}>
        <div> name: <input value={name} onChange={namechange}/></div>
        <div> number: <input value={number} onChange={numberchange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  </div>
  )}
  
const Notification = ({ message,color }) => {
  const msg_style = {
    color: color,
    fontStyle: 'italic',
    fontSize: 20,
    background: 'lightgrey',
    padding: 10,
    marginBottom: 10,
    borderStyle: 'solid',
    borderRadius: 2
  }

  if (message === null) {
    return null 
  }

  return (
    <div style={msg_style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered_persons, setNewFilter] = useState(persons)
  const [newValue, setNewValue] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('green')

  useEffect(()=>{
    personService.getAll()
      .then(personList => {
        setPersons(personList)
        setNewFilter(personList)
      })
  },[]) 


  console.log(`persons: ${persons}`)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewValue(event.target.value)
    const filter_value = event.target.value.toLowerCase()
    // console.log(filter_value)
    const filtered_list = persons.filter(person => person.name.toLowerCase().match(filter_value)!=null)
    // console.log(filtered_list)
    setNewFilter(filtered_list)
  }

  const deletePerson = person => {
    window.confirm(`Do you want to delete ${person.name}?`)
      ?personService.deletePerson(person.id)
      :console.log("alright then")
    // not sure whether to 
    // remove person in front-end
    // or from back-end (fetch full list again)
    // front-end seems more elegant so here we go
    const newPersonsList = persons.filter(element => element !== person)
    setPersons(newPersonsList)
    setNewFilter(newPersonsList)
  }
     

  const addPerson = (event) => {
    event.preventDefault()
    const namecheck = []
    persons.map(person => namecheck.push(person.name))
    console.log(namecheck)
    const checking = namecheck.find(element => element === newName)
    const ogPerson = persons.find(element => element.name === newName)
    console.log(ogPerson)
    const updatePerson = {...ogPerson, number: newNumber}
    if (checking) {    
      window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)
        ?personService.editPerson(ogPerson.id, updatePerson)
        .then(()=> {
          //setPersons(persons.map(person => person===ogPerson?updatePerson:person))
          //setNewFilter(persons.map(person => person===ogPerson?updatePerson:person))
          personService.getAll().then(personlist => {
            setPersons(personlist)
            setNewFilter(personlist)
          })
          setMessage(`${ogPerson.name} has been modified`)
          setColor('green')
          setTimeout(()=>{setMessage(null)},3000)
        })
        .catch(error => {
          setMessage(`${ogPerson.name} has been deleted from server`)
          setColor('red')
          setTimeout(()=>{setMessage(null)},3000)
          personService.getAll().then(personlist => {
            setPersons(personlist)
            setNewFilter(personlist)
          })
        })
        :console.log("alright then")
      setNewName('')
      setNewNumber('')
      }
    else {
      const newObj = {name: newName, number: newNumber}
      const response = personService.create(newObj)
      console.log(response)
      personService.getAll().then(personlist => {
        setPersons(personlist)
        setNewFilter(personlist)
        })
      //setPersons(persons.concat(newObj))
      //setNewFilter(persons.concat(newObj))
      console.log(persons)
      setNewName('')
      setNewNumber('')
      setNewValue('')
      setMessage(`${newObj.name} has been added`)
      setColor('green')
      setTimeout(()=>{setMessage(null)},3000)

    }
  }

    
  return (
    <div>
      <Notification message={message} color={color} />
      <h2>Phonebook</h2>
      <Filter filterchange={handleFilterChange} filtervalue={newValue}/>
      <h2>Add a new </h2>
      <Persons submit={addPerson} name={newName} number={newNumber} namechange={handleNameChange} numberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {filtered_persons.map(person => <Numbers key={person.id} person={person} deleteFunc={deletePerson} />)}
      </div>
    </div>
  )
}

export default App;

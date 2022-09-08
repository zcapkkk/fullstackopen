import { useState } from 'react'

const Numbers = ({ person, keyvalue }) =>  <p key={keyvalue}>{person.name} {person.number}</p>

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

  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtered_persons, setNewFilter] = useState(persons)
  const [newValue, setNewValue] = useState('')

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

  const addPerson = (event) => {
    event.preventDefault()
    const namecheck = []
    persons.map(person => namecheck.push(person.name))
    console.log(namecheck)
    const checking = namecheck.find(element => element === newName)
    if (checking) {
      console.log("Clash")
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }
    else {
      const newObj = {name: newName, number: newNumber, id: persons.length+1}
      setPersons(persons.concat(newObj))
      setNewFilter(persons.concat(newObj))
      console.log(persons)
      setNewName('')
      setNewNumber('')
      setNewValue('')
    }
  }

    
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterchange={handleFilterChange} filtervalue={newValue}/>
      <h2>Add a new </h2>
      <Persons submit={addPerson} name={newName} number={newNumber} namechange={handleNameChange} numberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {filtered_persons.map(person => <Numbers key={person.id.toString()} person={person} />)}
      </div>
    </div>
  )
}

export default App;

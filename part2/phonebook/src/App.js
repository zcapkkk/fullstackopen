import { useState } from 'react'

const Numbers = ({ person, keyvalue }) =>  <p key={keyvalue}>{person.name} {person.number}</p>

//const Filter = ({ onchange, value }) => {
//  // some logic
//  return(
//    <div>
//        filter shown with:
//        <input onChange={onchange} value={value} />
//    </div>
//  )
//}
  

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      setNewName('')
      setNewNumber('')
    }
  }

    
  return (
    <div>
      <h2>Phonebook</h2>
      <h2>Add a new </h2>
      <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Numbers key={person.id.toString()} person={person} />)}
      </div>
    </div>
  )
}

export default App;

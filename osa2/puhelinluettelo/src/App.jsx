import { useState } from 'react'

const Persons = ({person}) => {
  return(
    <li> {person.name} {person.number}</li>
  )
}

const Filter = ({value, onChange}) =>
{
    return(
        <li>filter shown with <input value={value} onChange={onChange}/></li>
    )
}


const PersonForm = ({addNameandNumber,newName, handleNameChange, newNumber, handleNumberChange}) =>
{
  return(
    <form onSubmit={addNameandNumber}>
    <h2>add a new</h2>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
    number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
    <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-555666"},
    { name: 'Matti Meikäläinen', number: '050-1234567' },
    { name: 'Liisa Virtanen', number: '044-9876543' },
    { name: 'Pekka Mäkinen', number: '041-2223334' },
    { name: 'Sari Korhonen', number: '045-7778889' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addNameandNumber = (event) => {
    event.preventDefault()
    console.log('newName:', newName)

    
    const nameObejct ={
      name: newName,
      number: newNumber
    }

    const onJo = persons.filter(person => person.name === newName)
    console.log(onJo)

    if(onJo.length > 0){
      alert(`${newName} is already added to phonebook`)
    } else{
      setPersons(persons.concat(nameObejct))
    console.log(persons)
    setNewName('')
    setNewNumber('')
    }

  }
const handleNameChange = (event) => {
  setNewName(event.target.value)
} 

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}



const handleNewSearch = (event) =>{
  setNewSearch(event.target.value)
} 

// Luodaan uusi lista, jossa on vain ne nimet, jotka vastaavat hakukentän syötettä
const filtered = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
console.log(filtered) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleNewSearch}/>
        <PersonForm addNameandNumber={addNameandNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      {filtered.map((person)=>(
       <Persons key={person.name} person = {person}/>
     ))}
     </ul>
    </div>
  )

}

export default App

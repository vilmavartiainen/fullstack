import { useState } from 'react'
import AddNameandNumber from './components/AddNameandNumber'

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
      <p>filter shown with <input value={newSearch} onChange={handleNewSearch}/></p>
      <AddNameandNumber>
        persons{persons}
        setPersons{setPersons}
        newname={newName}
        setNewName={setNewName}
        newSearch={setNewSearch}
        setNewSearch={setNewSearch}
      </AddNameandNumber>

      <h2>Numbers</h2>
    <ul>
      {filtered.map((person)=>(
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </ul>
    </div>
  )

}

export default App

import { useState } from 'react'

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
      <p>filter shown with <input value={newSearch} onChange={handleNewSearch}/></p>
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

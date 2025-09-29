import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Persons = ({person, poista}) => {
  return(
    <li> {person.name} {person.number} <button onClick={()=>poista(person.id)}>delete</button></li>
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
  const [persons, setPersons] = useState([])  // lista henkilöistä
  const [newName, setNewName] = useState('')  // uusi henkilö
  const [newNumber, setNewNumber] = useState('') // uuden henkilön nro
  const [newSearch, setNewSearch] = useState('') // hakukentän arvo

  //kustutaan deletePerson funktiota ja poistetaan henkilö listasta
  const poista = (id) => {
  console.log("delete clicked", id)
  personService  
    .deletePerson(id)
    .then(() => {
    setPersons(persons.filter((person) => person.id !== id))
    })
  }

// haetaan henkilöt db.json:ista
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])


  const addNameandNumber = (event) => {
    event.preventDefault()
    console.log('newName:', newName)    
    const nameObejct = {
      name: newName,
      number: newNumber
    }
    
    //tarkistus onko nimi listassa
    const onJo = persons.filter(person => person.name && person.name.toLowerCase() === newName.toLowerCase())
    console.log(onJo)

    if(onJo.length > 0){
      alert(`${newName} is already added to phonebook`)
    } else{
      //uusi henkilö jos sitä ei ole jo listassa
      personService
      .create(nameObejct)
      .then(returnedPerson => {
      console.log("returnedPerson:", returnedPerson)
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      })

    
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
const filtered = persons.filter(person => person.name && person.name.toLowerCase().includes(newSearch.toLowerCase()))
console.log(filtered) 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleNewSearch}/>
        <PersonForm addNameandNumber={addNameandNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
      {filtered.map((person)=>(
       <Persons key={person.name} person = {person} poista ={poista}/>
     ))}
     </ul>
    </div> 
  )

}

export default App

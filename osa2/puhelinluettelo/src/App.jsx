import { useEffect, useState } from 'react'
import personService from './services/persons'

const Persons = ({person, poista}) => {
  return(
    <li> {person.name} {person.number} <button onClick={()=>poista(person.id)}>delete</button></li>
  )
}

const Filter = ({value, onChange}) =>
{
    return(
        <div>filter shown with <input value={value} onChange={onChange}/></div>
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

//Ilmoitus, että henkilön lisääminen on onnistunut
const Notification = ({message}) => {
  if (message === null){
  return null
  }
  return(
    <div className='added'>
      {message}
    </div>
  )
}

// Ilmoitus, että henkilön poistaminen on onnistunut
const Notification2 = ({message}) =>{
  if (message === null){
    return null
  }
  return(
    <div className='deleted'>{message}</div>
  )
}

//Ilmoitus: henkilön numeron muutos on onnistunut
const Notification3 = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className='number'>{message}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])  // lista henkilöistä
  const [newName, setNewName] = useState('')  // uusi henkilö
  const [newNumber, setNewNumber] = useState('') // uuden henkilön nro
  const [newSearch, setNewSearch] = useState('') // hakukentän arvo
  const [addedPersonMsg, setaddedPersonMsg] = useState(null)
  const [deletePersonMsg, setdeletedPersonMsg] = useState(null)
  const [numberChange, setNumberChange] = useState(null)

  //kustutaan deletePerson funktiota ja poistetaan henkilö listasta
  const poista = (id) => {
  console.log("delete clicked", id)
  const deletedPerson = persons.find((p => p.id === id))
  personService  
    .deletePerson(id)
    .then(() => {
    setPersons(persons.filter((person) => person.id !== id))
    // ilmoitus näytölle että henkilö on poistettu
    setdeletedPersonMsg(
      `'${deletedPerson.name}' deleted from the phonebook`)
      setTimeout(() => {
          setdeletedPersonMsg(null)
      }, 5000)
    })
    .catch((error) => {
      alert(`error with deleting ${error.message}`)
    })
  }

  //korvataan vanha numero uudella
  const replace = (id, newNumber) => {
    const person = persons.find((n) => n.id === id)
    const changedNumber = {...person, number: newNumber}

    personService  
      .replaceNumber(id, changedNumber)
      .then((returnedPerson) => {
      setPersons(persons.map((person) => person.id !== id ? person: returnedPerson))
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      //jos käyttäjää painaa ok numero vaihtuu, jos painaa peru, mitään ei tapahdu  
      replace(onJo[0].id, newNumber)
      setNumberChange(`'${newName}'s old number changed to '${newNumber}' `)
      setTimeout(() => {
        setNumberChange(null)
      }, 5000)
      }
    } else{
      //uusi henkilö jos sitä ei ole jo listassa
      personService
        .create(nameObejct)
        .then(returnedPerson => {
        console.log("returnedPerson:", returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      // ilmoitus lisätystä henkilöstä
        setaddedPersonMsg(
      `'${returnedPerson.name}' added to phonebook`)
        setTimeout(() => {
        setaddedPersonMsg(null)
    }, 5000)
  })
      .catch((error) => {
        alert(`error with adding new name ${error.message}`)
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
      <Notification message={addedPersonMsg}/>
      <Notification2 message={deletePersonMsg}/>
      <Notification3 message={numberChange}/>
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

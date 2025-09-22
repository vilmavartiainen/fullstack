import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    {name: 'Maija Meikäläinen'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName =(event) => {
    event.preventDefault()
    console.log('newName:', newName)

    
    const nameObejct ={
      name: newName
    }

    const onJo = persons.filter(person => person.name === newName)
    console.log(onJo)

    if(onJo.length > 0){
      alert(`${newName} is already added to phonebook`)
    } else{
      setPersons(persons.concat(nameObejct))
    console.log(persons)
    setNewName('')
    }

  }

const handleNameChange = (event) => {
  setNewName(event.target.value)
} 

const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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
      {persons.map((person)=>(
        <li key={person.name}>{person.name} </li>
      ))}
    </ul>
    </div>
  )

}

export default App


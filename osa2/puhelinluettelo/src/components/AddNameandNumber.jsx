const AddNameandNumber =({persons, setPersons, newName, setNewName}) => {
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

    return(
      <form onSubmit={AddNameandNumber}>
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
  export default AddNameandNumber
const express = require('express')
const app = express()

let persons = [
    {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
    },
    { 
    id: "2",
    name: "Ada Lovelace",
    number: "39674567"},
    { 
    id: "3",
    name: "Dan Abramov",
    number: "050-457383"},
    {
    id: "4",
    name: "Mary",
    number: "9876"
}
]


app.get('/api/persons',(request, response) => {
    response.json(persons)
})

app.get('/info',(request, response) => {
    const date = new Date();
    const p = persons.length
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Phonebook has info for ' + p + ' people\n' + date )
  
    
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
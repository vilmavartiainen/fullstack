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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
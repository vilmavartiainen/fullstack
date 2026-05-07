require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

const errorHandler = (error, request, response, next) =>{
      if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))


// ei toimi muuta jossain vaiheessa
/*morgan.token('body', request => {
   return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :body'))*/


app.get('/api/persons',(request, response, next) => {
    Person.find({}).then((persons) => {
        response.json(persons)
    })
    .catch(error => next(error))
})

/*app.get('/info',(request, response) => {
    const date = new Date();
    const p = persons.length
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Phonebook has info for ' + p + ' people\n' + date )
    
})*/

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then((person) => {
        if (person) {
        response.json(person)
        } else {
            response.status(404).end()
        }
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id',(request, response, next) => {
    const {name, number} = request.body

    Person.findById(request.params.id)
    .then(person => {
        if(!person){
            return response.status(404).end()
    }
        person.name = name
        person.number = number

        console.log('Updating person', person)
        return person.save().then((updatedPerson) => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
    })
    .catch(error => next(error))
})
   /* const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else {
        response.status(404).end()
    }
  })*/

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then((result) => {
        response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    //const personsWithSameName = persons.filter(person => person.name && person.name.toLowerCase() === body.name.toLowerCase())

   /* if(personsWithSameName.length > 0) {
        return response.status(400).json({
            error: 'name must be unique' 
            })
     }*/

    if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number is missing'
            })
        }
       
    const person = new Person({
        name: body.name,
        number: body.number
      })

    person.save().then((savedPerson) => {
        response.json(savedPerson)
    })

  })


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/*const mongoose = require('mongoose')


const password = process.argv[2]
const url = `mongodb+srv://vilmaovartiainen:${password}@cluster0.jfxgrvb.mongodb.net/puhelinluettelo?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
    .then(result=>{
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)*/
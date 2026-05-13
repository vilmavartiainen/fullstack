require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
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

//Info sivu, kertoo montako nimeä puhelinluettelossa on ja ajan sekä päivämäärän
app.get('/info',(request, response, next) => {
  const date = new Date()

  Person.find({}).then((persons) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Phonebook has info for ' + persons.length + ' people\n' + date )
  }
  )
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id',(request, response, next) => {
  const { name, number } = request.body

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


// Käyttäjän poistaminen
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((
    ) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body


  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
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


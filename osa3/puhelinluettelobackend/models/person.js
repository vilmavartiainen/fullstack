const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

/*
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
*/

mongoose
     .connect(url)
     .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  }) 

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true

    },

   /*number: {
        type: String,
        minlength: 8,
        required: true
    }*/
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//const Person = mongoose.model('Person', personSchema)

/*
const person = new Person({
  name: name,
  number: number, 
})

if(process.argv.length === 3){
Person.find({}).then(result => {
    console.log('phonebook:')
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
}else{

person.save().then(result => {
  console.log(`added ${name} ${number} to phonebook`)
  mongoose.connection.close()
})
}*/
module.exports = mongoose.model('Person', personSchema)
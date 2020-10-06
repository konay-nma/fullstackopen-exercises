require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(express.static('build'))
const Person = require('./models/person')

//using a predified formaet string
//app.use(morgan('tiny'))
morgan.token('data', (req, res) => {
  if (req.method == 'POST') return JSON.stringify(req.body)
  return ''
})
morgan.token('type', req => req.headers['content-type'])
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data :type'))
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '0987654321'
  },
  {
    id: 2,
    name: 'Ada Lovelance',
    number: '0987654321'
  },
  {
    id: 3,
    name: 'Dan Abrampv',
    number: '0987654321'
  },
  {
    id: 4,
    name: 'Marry Popendick',
    number: '0987654321'
  },
]

const generateID = () => {
  let randID
  do {
    randID = Math.floor(Math.random() * 1000)
  } while (persons.map(person => person.id).includes(randID))

  return randID
}


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1> this is backend for phonebook')
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    res.json(result)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  //const person = persons.find(person => person.name === body.name)
  //if (!body.name || !body.number) return res.status(404).json({ error: 'name or number is missing' })
  const person = new Person({
    name: body.name,
    number: body.number
  })
  person.save()
    .then(returnedPerson => {
      res.json(returnedPerson)
    })
    .catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatePerson => {
      res.json(updatePerson)
    })
    .catch(error => {
      next(error)
    })
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

// handle of req with unkonwn endpint
app.use(unknownEndpoint) // call after res

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: 'malformated id' })
  } else if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`running server on port ${PORT}`)
})
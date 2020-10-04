const express = require('express')
const app = express()
app.use(express.json())

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
    let randID;
    do {
        randID = Math.floor(Math.random() * 1000)
    } while (persons.map(person => person.id).includes(randID));

    return randID
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) return res.status(404).end()
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    //const person = persons.find(person => person.name === body.name)
    if(!body.name || !body.number) return res.status(404).json({error: 'name or number is missing'})
    if (!body) return res.status(404).json({ error: 'content missing' })
    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }
    if (persons.find(person => person.name === body.name)) return res.status(404).json({error: 'name must be unique'})
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`running server on port ${PORT}`)
})
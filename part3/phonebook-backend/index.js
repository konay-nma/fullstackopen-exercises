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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`running server on port ${PORT}`)
})
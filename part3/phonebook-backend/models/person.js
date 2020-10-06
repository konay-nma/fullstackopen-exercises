const { query } = require('express')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(result => {
        console.log('connect to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedPerson) => {
        returnedPerson.id = returnedPerson._id.toString()
        delete returnedPerson._id
        delete returnedPerson.__v
    }
})

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)
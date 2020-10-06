const mongoose = require('mongoose')

if (process.argv.length < 5 && process.argv.length !== 3) {
    console.log('please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.wtkrm.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const dataSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', dataSchema)

if (process.argv.length === 3) {
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
        .catch(err => {
            console.log(err)
        })
}
if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({ name, number })

    person.save().then(result => {
        console.log(result)
        mongoose.connection.close()
    })
}




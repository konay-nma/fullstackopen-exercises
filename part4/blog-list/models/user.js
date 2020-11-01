const moongose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new moongose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  passwordHash: String,
  blogs: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (_document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
  }
})

const User = moongose.model('User', userSchema)

module.exports = User
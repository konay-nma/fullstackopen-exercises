const moongose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
//const User = require('../models/user')

describe('addition of new user', () => {
  test('fails with status code 400 if invalid user is added', async() => {
    const newUser = {
      name: 'Ko Nay',
      username: 'konay',
      password: 'password'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  moongose.connection.close()
})
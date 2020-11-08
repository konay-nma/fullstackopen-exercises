import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = event => {
    event.preventDefault()
    doLogin({
      username,
      password,
    })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes= {
  doLogin: PropTypes.func.isRequired
}

export default LoginForm

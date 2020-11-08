import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import '../src/App.css'
import LoginForm from './components/form/LoginForm'
import BlogForm from './components/form/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (credential) => {
    try {
      const user = await loginService.login(credential)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setMessage({ error: 'wrong username or password' })
      nullMessage()
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const nullMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogAdd = async (newBlog) => {
    blogRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      )
      nullMessage()
    } catch (error) {
      setMessage(error.response.data)
      nullMessage()
    }
  }

  const updateLike = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updateToBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const updatedBlog = await blogService.update(id, updateToBlog)
      console.log(updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updateToBlog))
    } catch (error) {
      console.log({ error })
    }
  }

  const deleteBLog = async (id) => {
    try {
      const deleteToBlog = blogs.find(blog => blog.id === id)
      const isDelete = window.confirm(`Remove blog ${deleteToBlog.title} by ${deleteToBlog.author}?`)

      if(isDelete) {
        await blogService.deleteBlog(id)
        const afterDeleted = blogs.filter(blog => blog.id !== id)
        setBlogs(afterDeleted)
        setMessage(`${deleteToBlog.title} is successfully remove`)
        nullMessage()
      }
    } catch (error) {
      setMessage(error.response.data)
      nullMessage()
      return
    }
  }

  const loginForm = () => {
    return (
      <LoginForm
        doLogin = {handleLogin}
      />
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLable = 'create new blog' ref = {blogRef} >
        <BlogForm createBlog = {blogAdd} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        {message && <div className="error">{message.error}</div>}
        {loginForm()}
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      {message && (
        <div className={message.error === undefined ? 'message' : 'error'}>
          {message.error === undefined ? message : message.error}
        </div>
      )}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
        <Blog key={blog.id} blog={blog} updateLike = {() => updateLike(blog.id)} deleteBlog = {() => deleteBLog(blog.id)} />
      ))}
    </div>
  )
}

export default App

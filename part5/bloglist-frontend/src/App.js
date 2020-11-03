import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "../src/App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage('worng username or password')
      nullMessage()
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const nullMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleBlogAdd = async (event) => {
    event.preventDefault();
    const newBlog = { title, author, url, userId: user.id };
    try {
      const returnedBlog = await blogService.create(newBlog);
      setBlogs(blogs.concat(returnedBlog));
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
      nullMessage();
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      setMessage(error.response.data);
      nullMessage();
      console.log(error.response.data.error);
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleBlogAdd}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>create</button>
      </form>
    );
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {message && <div className="error">{message}</div>}
        {loginForm()}
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      {message && (
        <div className={message.error === undefined ? "message" : "error"}>
          {message.error === undefined ? message : message.error}
        </div>
      )}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

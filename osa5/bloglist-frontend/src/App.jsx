import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user.token)
    }
  }, [])

   /* const handleBlogChange = (event) => {
    setNewBlog(event.target.value)
    console.log('uusi blogi postaus')
  }*/

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    blogService
      .create(blogObject)
      .then(returnedblog => {
        setBlogs(blogs.concat(returnedblog))
        setNewBlog('')
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

    const handleLogin = async event => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
     console.log('logging in with', username, password)
  }

   const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }




 const blogForm = () => (
      <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthorChange}/>
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlChange}/>
      </div>
      <button type="submit">create</button>
      </div>
    </form>
  )


  return (
    <div>
  
    
      {!user && ( 
        <div>
          <h1>login</h1>
            {loginForm()} 
        </div>
        )}
      {user && (
      <div>
        <h1>blogs</h1>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        
        {blogForm()}
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

      </div>
      )}
    </div> 
  )
}

export default App
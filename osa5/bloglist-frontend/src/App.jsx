import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'


 const Notification = ({message}) => {
    if (message === null){
      return null
    }
    return(
      <div className='newBlog'>
        {message}
      </div>
    )
  }

  const ErrorNotification = ({message}) => {
    if (message === null){
      return null
    }
    return(
      <div className='error'>
        {message}
      </div>
    )
  }

const App = () => {
  const [blogs, setBlogs] = useState([])
 // const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [createVisible, setCreatingVisible] = useState(false)

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
        //setNewBlog('')
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setBlogMessage(`a new blog '${newTitle}' by '${newAuthor}' added`)
        setTimeout(() => {
          setBlogMessage(null)
        }, 5000)
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
      setErrorMessage('wrong username or password')
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

  const blogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreatingVisible(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
          newTitle={newTitle}
          newAuthor={newAuthor}
          newUrl={newUrl}
          addBlog={addBlog}
          handleTitleChange={({target}) => setNewTitle(target.value)}
          handleAuthorChange={({target})=> setNewAuthor(target.value)}
          handleUrlChange={({target})=>setNewUrl(target.value)}
          />
          <button onClick={() => setCreatingVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }




 


  return (
    <div>
      {blogMessage && (
        <div className='newBlog'>
          {blogMessage}
          </div>
      )}
      {!user && ( 
        <div>
          
          <h1>login</h1>
          {errorMessage && (
        <div className='error'>
          {errorMessage}
          </div>
      )}
            {loginForm()} 
        </div>
        )}
      {user && (
      <div>
        <h1>blogs</h1>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        
        {blogForm()}

      </div>
      )}
    </div> 
  )
}

export default App
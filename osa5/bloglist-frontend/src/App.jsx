import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
//import Notification from './components/Notifications'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [createVisible, setCreatingVisible] = useState(false)
  const [blogs, setBlogs] = useState([])


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

  //Blogien poistaminen
  const handleRemoval = (id) => {
    console.log('poistamista painettu')

    const deletedBlog = blogs.find((b => b.id === id))
    if (window.confirm(`Remove blog '${deletedBlog.title}' 'by' '${deletedBlog.author}'`)){

      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .catch(error => {
          console.error('poistaminen epäonnistui', error)
          setErrorMessage('Poistaminen epäonnistui')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  //tykkäysten käsittely
  const handleLikes = (id) => {
    const blog = blogs.find (b => b.id === id)
    const changedLikes = { ...blog, likes: blog.likes +1, user: blog.user.id }

    blogService
      .update(id, changedLikes)
      .then(returnedBlog => {
        const fixedLikesBlog = {
          ...returnedBlog,
          user: blog.user
        }
        setBlogs(blogs.map(blog => blog.id !== id ? blog : fixedLikesBlog))
      })
      .catch(error => {
        console.error('tykkäys epäonnistui', error)
        setErrorMessage('Tykkäyksen lisääminen epäonnistui')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }



  //addBlog funktio ottaa vastaan valmiin blogiOlion blogForm komponentilta ja lisää sen blogien listaan
  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedblog => {
        //liitetään appin muistissa oleva kirjautunut käyttäjä blogiin, jotta poisto nappi saadaan näkyviin ilman päivitystä
        const blogWithLoggedUser = {
          ...returnedblog,
          user: user
        }
        setBlogs(blogs.concat(blogWithLoggedUser))
        setBlogMessage(`a new blog '${blogObject.title}' by '${blogObject.author}' added`)
        setTimeout(() => {
          setBlogMessage(null)
        }, 5000)
      })

  }


  //sisäänkirjautuminen
  const handleLogin = async event => {
    event.preventDefault()

    try {
      //käyttäjätunnuksen ja salasanan lähettäminen backille
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch { //jos salasana tai käyttäjätunnus väärä annetaan virheilmoitus
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
          <BlogForm createBlog={addBlog} />
          <button onClick={() => setCreatingVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  //kopioidaan blogi taulukko, joka järjestetään tykkäysten perusteella sortilla.
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a,b) => b.likes - a.likes)
  console.log('blogien liket järjstettynä' , sortedBlogs.map(blog => blog.likes))



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
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemoval={handleRemoval} user={user}/>
          )}

          {blogForm()}

        </div>
      )}
    </div>
  )
}

export default App
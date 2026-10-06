import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
//import Notification from './components/Notifications'
import { useNavigate } from 'react-router-dom'

import {BrowserRouter as Router,
  Routes, Route, Link, useMatch
} from 'react-router-dom'
import BlogPage from './components/BlogPage'
import LoginPage from './components/LoginPage'



const App = () => {
  
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogMessage, setBlogMessage] = useState(null)
  const [createVisible, setCreatingVisible] = useState(false)
  const [blogs, setBlogs] = useState([])

  const navigate = useNavigate()


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
        setCreatingVisible(false)
        setBlogs(blogs.concat(blogWithLoggedUser))
        setBlogMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setBlogMessage(null)
        }, 5000)
      })

  }


  

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
    navigate('/')
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


      //Blogien poistaminen
      const handleRemoval = (id) => {
        console.log('poistamista painettu')
    
        const deletedBlog = blogs.find((b => b.id === id))
        if (window.confirm(`Remove blog ${deletedBlog.title} by ${deletedBlog.author}`)){
    
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

  const match = useMatch('/:id')

  
  const showblog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  //kopioidaan blogi taulukko, joka järjestetään tykkäysten perusteella sortilla.
  const sortedBlogs = [...blogs]
  sortedBlogs.sort((a,b) => b.likes - a.likes)
  console.log('blogien liket järjstettynä' , sortedBlogs.map(blog => blog.likes))


  const padding = {padding: 5}

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        {user && (
          <div>
          <p>{user.name} logged in </p>
          <button onClick={handleLogout}>logout</button>
          </div>
        )}
        {!user && (
        <Link style={padding} to="login">login</Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<BlogPage 
          blogForm={blogForm}
          user={user}
          sortedBlogs={sortedBlogs}
          handleLogout={handleLogout}
          handleLikes={handleLikes}
          handleRemoval={handleRemoval}
         />} />
         <Route path="/login" element={<LoginPage 
         user={user}
         setUser={setUser}
         handleUsernameChange={({ target }) => setUsername(target.value)}
         handlePasswordChange={({ target }) => setPassword(target.value)}

         />} />
        <Route path="/:id" element={
          <Blog 
          blog={showblog}
          handleRemoval={handleRemoval}
          handleLikes={handleLikes}
          blogs={blogs}
          user={user}
          />
        } />
      </Routes>


      {blogMessage && (
        <div className='newBlog'>
          {blogMessage}
        </div>
      )}
          {errorMessage && (
            <div className='error'>
              {errorMessage}
            </div>
          )}
    </div>
  )
}

export default App
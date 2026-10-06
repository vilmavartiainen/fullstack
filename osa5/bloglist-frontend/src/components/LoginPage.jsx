import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'


const LoginPage = ({ user, setUser, setErrorMessage }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [setErrorMessage] = useState(null)

  const navigate = useNavigate()

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
      navigate('/')
    } catch { //jos salasana tai käyttäjätunnus väärä annetaan virheilmoitus
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }



  return (
    <div>
      {!user && (
        <div>
          <h1>login</h1>
          {loginForm()}
        </div>
      )}
    </div>
  )
}

export default LoginPage
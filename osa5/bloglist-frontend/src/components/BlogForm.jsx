import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
    //kutsuu apilta saatua funktiota ja antaa sille valmiin olion
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }


  return(
    <form onSubmit={addBlog}>
      <h1>create new blog</h1>
      <div>
        <div>
        title: <input value={newTitle} onChange={handleTitleChange} 
        placeholder='title'/>
        </div>
        <div>
        author: <input value={newAuthor} onChange={handleAuthorChange}
        placeholder='author'/>
        </div>
        <div>
        url: <input value={newUrl} onChange={handleUrlChange}
        placeholder='url'/>
        </div>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm
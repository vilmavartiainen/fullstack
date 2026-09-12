import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleRemoval, user }) => {

  const [infoVisible, setInfoVisible]= useState(false)


  const hideWhenVisible = { display: infoVisible ? 'none' : '' }
  const showWhenVisible = { display: infoVisible ? '' : 'none' }

  const shwowDelete = () => {
    if (blog.user && blog.user.username === user.username){ //tarkistus onko blogin tekijä sama kuin kirjautunut käyttäjä
      return { display: '' }
    } else {
      return { display: 'none' }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} {/* Title ja author näkyvissä kun infoVisible on false */}
        <button onClick={() => setInfoVisible(true)}>view</button> {/*Painalluksella tila muuttuu trueksi ja tiedot tulevat näkyviille, view nappi häviää ja hide tulee tilalle*/}
      </div>
      <div style={showWhenVisible}>
        {blog.title}  {blog.author}
        <button onClick={() => setInfoVisible(false)}>hide</button> {/*Painalluksella tila muuttuu falseksi ja hide nappula ja lisätiedot poistuvat ruudulta ja palataan edelliseen tilaan jossa näkyy vain view nappula ja title ja author*/}
        <div>{blog.url}</div>
        <div>likes  {blog.likes}
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </div>
        <div> {blog.user.name} </div>
        <button style={shwowDelete()} onClick={() => handleRemoval(blog.id)}>delete</button>
      </div>
    </div>
  )
}
export default Blog

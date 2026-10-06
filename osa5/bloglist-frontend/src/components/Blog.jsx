import { useParams } from 'react-router-dom'

const Blog = ({ blogs, handleLikes, handleRemoval, user }) => {


  const id = useParams().id
  const blog = blogs.find (b => b.id === id)

  if(!blog){
    return null
  }

  const shwowDelete = () => {
    console.log('kirjautunut', user, blog.user)
    if (user && blog.user && blog.user.username === user.username){ //tarkistus onko blogin tekijä sama kuin kirjautunut käyttäjä
      return { display: '' }
    } else {
      return { display: 'none' }
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      <h2>{blog.title} {blog.author} </h2>{/* Title ja author näkyvissä kun infoVisible on false */}
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>likes  {blog.likes}
        <button onClick={() => handleLikes(blog.id)}>like</button>
      </div>
      <div> {blog.user.name} </div>
      <button style={shwowDelete()} onClick={() => handleRemoval(blog.id)}>delete</button>
    </div>
  )
}
export default Blog

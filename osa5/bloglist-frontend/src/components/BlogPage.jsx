import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogPage = ({ sortedBlogs }) => {

  return (
    <div>
      <h2>blogs</h2>

      <ul>
        {sortedBlogs.map((blog) => (
          <div key={blog.id}>
            <Link to={`/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BlogPage
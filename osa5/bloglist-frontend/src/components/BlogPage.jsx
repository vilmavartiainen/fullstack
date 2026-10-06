import Blog from './Blog'
import { Link } from "react-router-dom";

const BlogPage = ({ blogForm, user, sortedBlogs, handleLogout, handleLikes, handleRemoval}) => {

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
    );
     /*return (
      <div>
        
        <div>
          <h1>blogs</h1>
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemoval={handleRemoval} user={user}/>
          )}

          {user && blogForm()}

        </div>
    </div>
  )*/
}

export default BlogPage
import Blog from './Blog'

const BlogPage = ({ blogForm, user, sortedBlogs, handleLogout, handleLikes, handleRemoval}) => {
     return (
      <div>
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

export default BlogPage
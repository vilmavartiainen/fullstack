const BlogForm = ({addBlog, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl
}) => (
      <form onSubmit={addBlog}>
      <h1>create new blog</h1>
      <div>
      <div>
        title: <input value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        author: <input value={newAuthor} onChange={handleAuthorChange}/>
      </div>
      <div>
        url: <input value={newUrl} onChange={handleUrlChange}/>
      </div>
      <button type="submit">create</button>
      </div>
    </form>
  )

export default BlogForm
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const config = require('../utils/config')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response) => {
  Blog.findById(request.params.id).then((blog) => {
    response.json(blog)
  })
})


blogsRouter.post('/', (request, response, next) => {
  const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog
    .save()
    .then((savedBlog) => {
        response.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response) => {
  const {blog} = request.body

  Blog.findById(request.params.id)
    .then(blog => {
      if(!blog){
        return response.status(404).end()
      }

      blog.title = blog.title
      blog.author = blog.author
      blog.url = blog.url
      blog.likes = blog.likes

      return blog.save().then((updatedBlog) => {
        response.json(updatedBlog)
      })
        .catch(error => next(error))
    })
})


module.exports = blogsRouter

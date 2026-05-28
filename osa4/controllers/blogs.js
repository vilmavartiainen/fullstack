const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const config = require('../utils/config')
const logger = require('../utils/logger')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id',async (request, response) => {
  const blog = await Blog.findById (request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (body.likes === undefined){
    body.likes = 0
  }

  if ( body.title === undefined || body.url === undefined){
    return response.status(400).end()
  }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes

    })

    const savedBlog = await blog.save()
    response.status(200).json(savedBlog)
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
        response.status(201).json(updatedBlog)
      })
        .catch(error => next(error))
    })
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter

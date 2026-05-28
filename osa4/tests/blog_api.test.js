const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blogs')




const api = supertest(app)

const blogs = [
      {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
  blogObject = new Blog(blogs[2])   
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.deepStrictEqual(response.body.length, blogs.length)

})

test('blogs id should be called id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
   
    assert.notStrictEqual(blog.id, undefined) 
})

test('blogs can be added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)  
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, blogs.length + 1)

    const blogsNames = response.body.map(blog => blog.title)
    const isThereNewTitle = blogsNames.includes(newBlog.title)
    assert.strictEqual(isThereNewTitle, true)

})

test('if likes have no value, value is zero', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)  
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const addedBlog = response.body[response.body.length - 1]

    assert.strictEqual(addedBlog.likes, 0)
})

test('blog without title is not added', async () => {
        const newBlog = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 6
    }

     await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)  

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogs.length)

})

test('blog without url is not added', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        likes: 6
    }

     await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)  

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, blogs.length)
})

test('blogs can be deleted', async () =>{
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const responseAtEnd = await api.get('/api/blogs')
    const blogsAtEnd = responseAtEnd.body

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))
    
    assert.strictEqual(blogsAtEnd.length, blogs.length - 1)

})

after(async () => {
  await mongoose.connection.close()
})
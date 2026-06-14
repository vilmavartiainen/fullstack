const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blogs')
const bcrypt = require('bcrypt')
const User = require('../models/users')
const helper = require('./test_helper')




const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])   
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

  assert.deepStrictEqual(response.body.length, helper.initialBlogs.length)

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

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

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
    assert.strictEqual(response.body.length, helper.initialBlogs.length)

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
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
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
    
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'muumi', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vilmis',
      name: 'Vilma Vartiainen',
      password: 'salainen'
    }
    await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))  
})

  test('creatio fails with proper statuscode and message if username is already taken', async()=>{
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'muumi',
      name: 'muumipeikko',
      password: 'salainen'
  }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const userAtend = await helper.usersInDb()
      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(userAtend.length, usersAtStart.length)

  })

})

after(async () => {
  await mongoose.connection.close()
})

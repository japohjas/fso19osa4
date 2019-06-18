const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('blogs tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('tietokantaan talletettujen olioiden tunnistekenttä on _id', async () => {
    const response = await api.get('/api/blogs')
    // models/blog.js - returnedObject.id = returnedObject._id.toString()
    expect(response.body[0].id).toBeDefined()
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Uusi Blogi',
      author: 'Jaako Jumissa',
      url: 'https://fullstackopen.com/osa4/backendin_testaaminen',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    const author = response.body[response.body.length - 1].author
    const url = response.body[response.body.length - 1].url
    const likes = response.body[response.body.length - 1].likes

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(title).toContain('Uusi Blogi')
    expect(author).toContain('Jaako Jumissa')
    expect(url).toContain('https://fullstackopen.com/osa4/backendin_testaaminen')
    expect(likes) === 5
  })

  test('jos kentälle likes ei anneta arvoa, asetetaan sen arvoksi 0', async () => {
    const newBlog = {
      title: 'Uusi Blogi',
      author: 'Jaako Jumissa',
      url: 'https://fullstackopen.com/osa4/backendin_testaaminen',
      likes: undefined
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const likes = response.body[response.body.length - 1].likes

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(likes) === 0
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'uuuu',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'jp', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'ml',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
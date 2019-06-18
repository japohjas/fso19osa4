const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testiblogi 1',
    author: 'Joulu Pukki',
    url: 'https://fullstackopen.com/osa4/backendin_testaaminen',
    likes: 1
  },
  {
    title: 'Testiblogi 2',
    author: 'Uuno Ykkönen',
    url: 'https://fullstackopen.com/osa4/backendin_testaaminen',
    likes: 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: 'willremovethissoon',
    likes: 1
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}
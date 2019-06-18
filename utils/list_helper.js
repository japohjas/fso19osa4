// palauttaa aina luvun 1
const dummy = (blogs) => {
  return 1
}

// Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän.
const totalLikes = (blogs) => {
  // console.log(blogs)
  if (blogs.length === 0) {
    return 0
  }

  const likes = blogs.map(b => b.likes)
  const reducer = (sum, item) => sum + item
  return likes.reduce(reducer, 0)
}

// Funktio selvittää millä blogilla on eniten likejä.
// Jos suosikkeja on monta, riittää että funktio palauttaa niistä jonkun.
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const mostLikes = Math.max(...blogs.map(b => b.likes))
  console.log('most likes:', mostLikes)
  return blogs.find(b => b.likes === mostLikes)
}

// Funktio selvittää kirjoittajan, kenellä on eniten blogeja.
// Funktion paluuarvo kertoo myös ennätysblogaajan blogien määrän:
const mostBlogs = (blogs) => {
  const authorsAndBlogs = new Map()

  blogs.forEach( b => authorsAndBlogs.set(b.author, authorsAndBlogs.get(b.author) + 1 || 1) )
  console.log('authors and blogs: ', authorsAndBlogs)

  let mostAuthor = ''
  let authorBlogs = 0

  for (const [k, v] of authorsAndBlogs) {
    // console.log('Key: ' , k, ': Value: ' , v)
    if (v > authorBlogs) {
      mostAuthor = k
      authorBlogs = v
    }
  }

  return {
    author: mostAuthor,
    blogs: authorsAndBlogs.get(mostAuthor)
  }
}

// Funktio selvittää kirjoittajan, kenen blogeilla on eniten likejä.
// Funktion paluuarvo kertoo myös suosikkiblogaajan likejen yhteenlasketun määrän:
const mostLikes = (blogs) => {
  const authorsAndLikes = new Map()

  blogs.forEach( b => authorsAndLikes.set(b.author, authorsAndLikes.get(b.author) + b.likes || b.likes) )
  console.log('authors and likes: ', authorsAndLikes)

  let authorWithMostLikes = ''
  let likes = 0

  for (const [k, v] of authorsAndLikes) {
    // console.log('Key: ' , k, ': Value: ' , v)
    if (v > likes) {
      authorWithMostLikes = k
      likes = v
    }
  }

  return {
    author: authorWithMostLikes,
    likes: authorsAndLikes.get(authorWithMostLikes)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
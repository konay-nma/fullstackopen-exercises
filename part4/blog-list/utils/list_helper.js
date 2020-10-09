const dummy = blogs => {
  if(Array.isArray(blogs)) {
    return 1
  }
}

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  //map and reduce with initialValue; better solution, also work empty or larger arrays
  const maxLike = blogs.map(blog => blog.likes).reduce((a, b) => Math.max(a,b), 0) // good design, bug less
  return blogs.find(blog => blog.likes === maxLike)
  //return blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes))) //is it may return wrong val
}

const mostBlogs = blogs => {
  const maxBlogs = blogs.reduce((prev, curr, i, arr) => {
    const prevArr = arr.filter(blog => blog.author === prev.author)
    const currArr = arr.filter(blog => blog.author === curr.author)
    return prevArr.length > currArr.length
      ? prevArr
      : currArr
  })
  return {
    author: maxBlogs[0].author,
    blogs: maxBlogs.length
  }
}

const mostLikes = blogs => {
  const maxLike = blogs.map(blog => blog.likes).reduce((a, b) => Math.max(a,b), 0) // good design, bug less
  const maxLikeBlogArr = blogs.filter(blog => blog.author ===  blogs.find(blog => blog.likes === maxLike).author)
  return {
    author: maxLikeBlogArr[0].author,
    likes: maxLikeBlogArr.map(blog => blog.likes).reduce(((acc, curr) => acc + curr), 0)
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }

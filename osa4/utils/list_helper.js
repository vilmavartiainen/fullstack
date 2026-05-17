const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>{
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null
    const reducer = (blog1, blog2)=>{
        if (blog1.likes > blog2.likes){
            return blog1
        }else{
            return blog2
        }
    }
    return blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
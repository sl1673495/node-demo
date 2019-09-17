const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'a',
      content: 'A',
      createTime: 1546610491112,
      author: 'ssh'
    },
    {
      id: 2,
      title: 'b',
      content: 'B',
      createTime: 1546610491112,
      author: 'ssh'
    },
    {
      id: 3,
      title: 'c',
      content: 'C',
      createTime: 1546610491112,
      author: 'ssh'
    }
  ]
}

const getDetail = id => {
  return {
    id,
    title: 'a',
    content: 'A',
    createTime: 1546610491112,
    author: 'ssh'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 3
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const deleteBlog = id => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method, path, query } = req
  const { id } = query

  // 获取列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query
    const listdData = getList(author, keyword)
    return new SuccessModel(listdData)
  }

  // 获取详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const detail = getDetail(id)
    return new SuccessModel(detail)
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blog = newBlog(req.body)
    return new SuccessModel(blog)
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/delete') {
    const result = deleteBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter

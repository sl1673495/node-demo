const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = async (req, res) => {
  const { method, path, query } = req
  const { id } = query

  // 获取列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query
    const listData = await getList(author, keyword)
    return new SuccessModel(listData)
  }

  // 获取详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const detail = await getDetail(id)
    return new SuccessModel(detail)
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckError = loginCheck(req)
    if (loginCheckError) {
      return loginCheckError
    }
    // TODO 假数据
    req.body.author = 'ssh'
    const result = await newBlog(req.body)
    return new SuccessModel(result)
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const success = await updateBlog(id, req.body)
    if (success) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/del') {
    // TODO 假数据
    const author = 'ssh'
    const result = await deleteBlog(id, author)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter

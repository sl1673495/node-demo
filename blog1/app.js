const qs = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const handle404 = res => {
  res.writeHead(404, { 'Content-type': 'text/plain' })
  res.write('404 Not Found!\n')
  res.end()
}

const getRequestData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = async (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const { url, method } = req
  const path = url.split('?')[0]
  req.path = path

  // 解析query
  req.query = qs.parse(url.split('?')[1])
  req.body = await getRequestData(req)

  // 处理blog路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  // 处理user路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 处理404
  handle404(res)
}

module.exports = serverHandle

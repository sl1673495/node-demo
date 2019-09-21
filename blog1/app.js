const qs = require('querystring')
const redisClient = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// session数据
const SESSION_DATA = {}

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

const getCookie = req => {
  const cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const [key, val] = arr.map(v => v.trim())
    cookie[key] = val
  })
  return cookie
}

const handleSession = (req, res) => {
  req.sessionStore = SESSION_DATA

  let sessionId = req.cookie.sessionId
  if (sessionId) {
    if (!SESSION_DATA[sessionId]) {
      SESSION_DATA[sessionId] = {}
    }
  } else {
    sessionId = `${Date.now()}_${Math.random()}`
    SESSION_DATA[sessionId] = {}
  }
  req.sessionId = sessionId
  req.session = SESSION_DATA[sessionId]
  if (req.path.includes('/api')) {
    res.setHeader('Set-Cookie', `sessionId=${req.sessionId}; httpOnly`)
  }
}

const serverHandle = async (req, res) => {
  res.setHeader('Content-type', 'application/json')

  const { url, method } = req
  const path = url.split('?')[0]
  req.path = path

  // 解析query
  req.query = qs.parse(url.split('?')[1])
  // 解析body
  req.body = await getRequestData(req)
  // 解析cookie
  req.cookie = getCookie(req)
  handleSession(req, res)
  // 解析session

  // 处理blog路由
  const blogData = await handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  // 处理user路由
  const userData = await handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 处理404
  handle404(res)
}

module.exports = serverHandle

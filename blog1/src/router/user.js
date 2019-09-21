const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + ((24 * 60) & (60 * 1000)))
  return d.toGMTString()
}

const handleUserRouter = async (req, res) => {
  const { method, path } = req

  // 登录接口
  if (method === 'GET' && path === '/api/user/login') {
    const { username, password } = req.query
    const user = await loginCheck(username, password)

    if (user) {
      const {session} = req
      const { username, realname } = user
      session.username = username
      session.realname = realname
      return new SuccessModel('登录成功')
    } else {
      return new ErrorModel('登录失败')
    }
  }

  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return new SuccessModel(`登陆成功，用户名是${req.session.username}, session是${JSON.stringify(req.session)}`)
    } else {
      return new ErrorModel('尚未登录')
    }
  }
}

module.exports = handleUserRouter

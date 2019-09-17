const loginCheck = (username, password) => {
  if (username === 'ssh' && password === '123') {
    return true
  }
  return false
}

module.exports = {
  loginCheck
}
